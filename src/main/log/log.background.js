import log from 'electron-log'
import { join as _join } from 'path'

const logPath = _join(process.cwd(), process.env.VUE_APP_LOG_PATH)

export function initLog() {
  log.transports.file.file = logPath
}
