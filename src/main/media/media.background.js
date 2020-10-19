import jsmediatags from 'jsmediatags'
import { promises as fsPromises } from 'fs'

// * read media info from audio file
export async function readMediaTag(path) {
  let _file = await fsPromises.readFile(path)
  return new Promise(function(resolve, reject) {
    jsmediatags.read(_file, {
      onSuccess(tag) {
        resolve(tag)
      },
      onError(err) {
        reject(err)
      }
    })
    _file = null
  })
}
