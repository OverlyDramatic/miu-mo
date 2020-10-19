import { ipcRenderer } from 'electron'
import { readFileFromDir } from '@/main/action/file.background'

// * read aduio files from dir ( not recursively)
export function initFileWorker() {
  ipcRenderer.on('from-main-get-media-tag', async (event, dirPath) => {
    const _insertData = []
    await Promise.all(
      await dirPath.paths.map(async path => {
        const _currentDirFiles = await readFileFromDir(path)
        _insertData.push(..._currentDirFiles)
        return _currentDirFiles
      })
    )
    ipcRenderer.send('to-main-get-media-tag', _insertData)
  })
}
