import { ipcMain, dialog } from 'electron'

export function initOpenDir(currentWindow) {
  ipcMain.on('open-dir', async function(event) {
    const dirPath = await openDirDialog(currentWindow)
    event.reply('reply-dir', dirPath)
  })
}

function openDirDialog(currentWindow) {
  return dialog
    .showOpenDialog(currentWindow, {
      properties: ['openDirectory']
    })
    .then(res => {
      if (res.canceled) {
        return null
      }
      return res.filePaths[0]
    })
}
