import jsmediatags from 'jsmediatags'

// * read media info from audio file
export function readMediaTag(path) {
  return new Promise(function(resolve, reject) {
    jsmediatags.read(path, {
      onSuccess(tag) {
        resolve(tag)
      },
      onError(err) {
        reject(err)
      }
    })
  })
}
