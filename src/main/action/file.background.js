import { ipcMain, dialog } from 'electron'
import { promises as fsPromises } from 'fs'
import { normalize } from 'path'

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
      const fileData = await readFilesInDir(res.filePaths[0])
      return fileData
    })
}

// TODO 递归读取指定目录下音频文件
// * recursively read files info from dir
async function readFilesInDir(dir) {
  try {
    const files = await fsPromises.readdir(normalize(dir))
    return files
  } catch (err) {
    console.error(err)
    return null
  }
}
