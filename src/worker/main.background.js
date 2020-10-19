// * 新建一个不可见的render process， 用于多线程处理cpu密集任务
import { BrowserWindow } from 'electron'
import { join as _join } from 'path'

let worker = null

export function createWorkerWindow() {
  worker = new BrowserWindow({
    // show: false,
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    worker.loadURL(_join(process.env.WEBPACK_DEV_SERVER_URL, 'worker'))
    if (!process.env.IS_TEST) worker.webContents.openDevTools()
  } else {
    worker.loadURL('app://./worker.html')
  }

  worker.on('closed', () => {
    worker = null
  })
  // * init main process
}

export function snedToWorker(eventName, data) {
  worker.webContents.send(eventName, data)
}
