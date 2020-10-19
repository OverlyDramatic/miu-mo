// * NeDB数据库

import path from 'path'
import Datastore from 'nedb-promises'

import { app } from 'electron'

let _db = null

export function initNeDB() {
  const dbFileNameOriginPath = path.join(
    app.getAppPath(),
    process.env.VUE_APP_DATA_ORIGIN_PATH_PATH
  )
  const dbFileNameOrigin = path.join(
    app.getAppPath(),
    process.env.VUE_APP_DATA_ORIGIN_FILE_PATH
  )
  const dbFileNameTarget = path.join(
    app.getAppPath(),
    process.env.VUE_APP_DATA_TARGET_FILE_PATH
  )
  // * 初始化NeDB数据库
  const dbOriginPath = new Datastore({
    filename: dbFileNameOriginPath,
    autoload: true
  })
  const dbOrigin = new Datastore({
    filename: dbFileNameOrigin,
    autoload: true
  })
  const dbTarget = new Datastore({
    filename: dbFileNameTarget,
    autoload: true
  })
  _db = {
    dbOriginPath,
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
