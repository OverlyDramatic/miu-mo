import log from 'electron-log'
import { join as _join } from 'path'
import { app } from 'electron'

const logPath = _join(app.getAppPath(), process.env.VUE_APP_LOG_PATH)

export function initLog() {
  log.transports.file.file = logPath
}
