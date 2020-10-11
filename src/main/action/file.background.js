import { ipcMain, dialog } from 'electron'
import { promises as fsPromises } from 'fs'
import { normalize as _normalize, join as _join } from 'path'
import log from 'electron-log'
import { useDB } from '@/main/database/database.background'

const regAudioFile = /.+(\.mp3|\.Mp3|\.flac)$/

export function initOpenDir(currentWindow) {
  ipcMain.on('open-dir', async function(event) {
    const dirPath = await openDirDialog(currentWindow)
    event.reply('reply-dir', dirPath)
  })
}

// * open dir dialog
async function openDirDialog(currentWindow) {
  return dialog
    .showOpenDialog(currentWindow, {
      properties: ['openDirectory']
    })
    .then(async res => {
      if (res.canceled) {
        return null
      }
      const _path = res.filePaths[0]
      const fileData = await readDirs(_path)
      // * 写入数据库 write into database
      const fileDataMap = {
        rootPath: _path,
        paths: fileData
      }
      try {
        const existData = await useDB('dbOrigin').find({ rootPath: _path })
        if (!existData.length) {
          return await useDB('dbOrigin').insert(fileDataMap)
        } else {
          const _id = existData[0]._id
          return await useDB('dbOrigin').update({ _id }, fileDataMap)
        }
      } catch (err) {
        log.error(err)
        return err
      }
    })
}

// TODO 递归读取指定目录下音频文件
// * recursively read dirs
export async function readDirs(dir) {
  const _dir = _normalize(dir)
  const pathSet = new Set()
  try {
    const fileArray = await fsPromises.readdir(_dir)
    // ! log empth dir 日志记录空目录
    if (!fileArray.length) {
      log.info('empty', _dir)
    }

    for (const index in fileArray) {
      const file = fileArray[index]
      const _file = _join(_dir, file)
      // * is _file dir or file?
      const fileStat = await fsPromises.stat(_file)
      if (fileStat.isDirectory()) {
        const subPathSet = await readDirs(_file)
        subPathSet.forEach(item => {
          pathSet.add(item)
        })
      } else if (regAudioFile.test(file)) {
        if (pathSet.has(_dir)) {
          break
        }
        pathSet.add(_dir)
      } else {
        // ! 日志记录文件不是音频文件
        log.info('not audio file', _file)
      }
    }
    return Array.from(pathSet)
  } catch (err) {
    log.error(err)
    return Array.from(pathSet)
  }
}
