// * NeDB数据库

import path from 'path'
import Datastore from 'nedb-promises'

let _db = null

export function initNeDB() {
  const dbFileNameOrigin = path.join(
    process.cwd(),
    process.env.VUE_APP_DATA_ORIGIN_FILE_PATH
  )
  const dbFileNameTarget = path.join(
    process.cwd(),
    process.env.VUE_APP_DATA_TARGET_FILE_PATH
  )
  // * 初始化NeDB数据库
  const dbOrigin = new Datastore({
    filename: dbFileNameOrigin,
    autoload: true
  })
  const dbTarget = new Datastore({
    filename: dbFileNameTarget,
    autoload: true
  })
  _db = {
    dbOrigin,
    dbTarget
  }
  return _db
}

export function useDB(dbname) {
  if (!_db || Object.keys(_db).length === 0) {
    return null
  } else if (dbname) {
    return _db[dbname]
  }
  return _db
}
