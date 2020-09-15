/**
 * window控制相关操作
 * 1-关闭窗口 close window
 * 2-最小化 restore
 * 3-最大化 maximize
 */
import { ipcMain } from 'electron'

export function initWindowControl(currentWindow) {
  // * 注册主动操作事件
  ipcMain.on('window-close', function() {
    currentWindow.close()
  })
  ipcMain.on('window-min', function() {
    currentWindow.minimize()
  })
  ipcMain.on('window-max', function() {
    if (currentWindow.isMaximized()) {
      currentWindow.restore()
    } else {
      currentWindow.maximize()
    }
  })
  // * 监听窗口变化
  currentWindow.on('maximize', function() {
    currentWindow.webContents.send('window-max')
  })
  currentWindow.on('unmaximize', function() {
    currentWindow.webContents.send('window-unmax')
  })
  currentWindow.on('minimize', function() {
    currentWindow.webContents.send('window-min')
  })
  currentWindow.on('restore', function() {
    currentWindow.webContents.send('window-restore')
  })
}
