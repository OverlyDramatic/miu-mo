import { ipcMain, dialog } from 'electron'
import { promises as fsPromises } from 'fs'
import { normalize as _normalize, join as _join } from 'path'

const regAudioFile = /.+(\.mp3|\.Mp3|\.flac)$/

export function initOpenDir(currentWindow) {
  ipcMain.on('open-dir', async function(event) {
    const dirPath = await openDirDialog(currentWindow)
    event.reply('reply-dir', dirPath)
  })
}

// * open dir dialog
function openDirDialog(currentWindow) {
  return dialog
    .showOpenDialog(currentWindow, {
      properties: ['openDirectory']
    })
    .then(async res => {
      if (res.canceled) {
        return null
      }
      const fileData = await readDirs(res.filePaths[0])
      return fileData
    })
}

// TODO 递归读取指定目录下音频文件
// * recursively read dirs
export async function readDirs(dir) {
  const _dir = _normalize(dir)
  const pathSet = new Set()
  try {
    const fileArray = await fsPromises.readdir(_dir)
    // TODO log empth dir 用日志记录空目录
    if (!fileArray.length) {
      console.log('nothing', _dir)
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
        // TODO log not audio file 用日志记录文件不是音频文件
        console.log('not audio file', _file, '\n')
      }
    }
    return Array.from(pathSet)
  } catch (err) {
    console.error(err)
    return Array.from(pathSet)
  }
}
