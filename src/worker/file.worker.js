import { ipcRenderer } from 'electron'
import { readFileFromDir } from '@/main/action/file.background'

// * read aduio files from dir ( not recursively)
export function initFileWorker() {
  ipcRenderer.on('from-main-get-media-tag', async (event, dirPath) => {
    let _insertData = []
    await Promise.all(
      // TODO 切片读取，优化性能
      await dirPath.paths.map(async (path, index) => {
        const _currentDirFiles = await readFileFromDir(path)
        _insertData = _insertData.concat(_currentDirFiles)
        // return _currentDirFiles
        return index
      })
    )
    ipcRenderer.send('to-main-get-media-tag', _insertData)
  })
}
