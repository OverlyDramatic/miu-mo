import { ipcMain, dialog } from 'electron'
import { promises as fsPromises } from 'fs'
import { normalize as _normalize, join as _join } from 'path'
import log from 'electron-log'
import { useDB } from '@/main/database/database.background'
import { readMediaTag } from '@/main/media/media.background'
// * worker
import { snedToWorker } from '@/worker/main.background'

const regAudioFile = /.+(\.mp3|\.Mp3|\.flac)$/

export function initOpenDir(currentWindow) {
  ipcMain.on('open-dir', async function(event) {
    const dirPath = await openDirDialog(currentWindow)
    // const _insertData = []
    // FIXME async issue
    if (dirPath) {
      const readMediaTags = async (e, data) => {
        const insertedData = await useDB('dbOrigin').insert({
          rootPath: dirPath.rootPath,
          files: data
        })
        event.reply('reply-dir', insertedData)
        // * remove event
        ipcMain.removeListener('to-main-get-media-tag', readMediaTags)
      }
      // * send to worker process
      ipcMain.on('to-main-get-media-tag', readMediaTags)
      snedToWorker('from-main-get-media-tag', dirPath)
      // * cache the event
      // await Promise.all(
      //   await dirPath.paths.map(async path => {
      //     const _currentDirFiles = await readFileFromDir(path)
      //     _insertData.push(..._currentDirFiles)
      //     return _currentDirFiles
      //   })
      // )
      // const insertedData = await useDB('dbOrigin').insert({
      //   rootPath: dirPath.rootPath,
      //   files: _insertData
      // })
      // event.reply('reply-dir', insertedData)
    } else {
      event.reply('reply-dir', null)
    }
  })
}

// * open dir dialog
async function openDirDialog(currentWindow) {
  return dialog
    .showOpenDialog(currentWindow, {
      properties: ['openDirectory']
    })
    .then(
      async res => {
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
          const existData = await useDB('dbOriginPath').find({
            rootPath: _path
          })
          if (!existData.length) {
            return await useDB('dbOriginPath').insert(fileDataMap)
          } else {
            const _id = existData[0]._id
            return await useDB('dbOriginPath').update({ _id }, fileDataMap, {
              returnUpdatedDocs: true
            })
          }
        } catch (err) {
          log.error(err)
          return null
        }
      },
      rej => {
        log.error(rej)
        return null
      }
    )
}

// 递归读取指定目录下音频文件
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

// * read aduio files from dir ( not recursively)
export async function readFileFromDir(dir) {
  try {
    const fileArray = await fsPromises.readdir(dir)
    const mappedFileArray = await fileArray
      .filter(item => {
        return regAudioFile.test(item)
      })
      .map(async item => {
        // js media tag
        const _path = _join(dir, item)
        let mediaInfo
        try {
          mediaInfo = await readMediaTag(_path)
          const mediaTag = mediaInfo.tags
          return {
            filename: item,
            path: _path,
            title: mediaTag.title,
            artist: mediaTag.artist,
            album: mediaTag.album,
            track: mediaTag.track
          }
        } catch (err) {
          log.error(err)
          // mediaInfo = null
          return {
            filename: item,
            path: _path
          }
        }
      })
    return await Promise.all(mappedFileArray)
  } catch (err) {
    log.error(err)
    return []
  }
}
