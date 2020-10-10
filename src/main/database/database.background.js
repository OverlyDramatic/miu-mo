// * NeDB数据库

import path from 'path'
import Datastore from 'nedb'

let _db = null

export function initNeDB() {
  const dbFileName = path.join(process.cwd(), process.env.VUE_APP_DATA_PATH)
  // * 初始化NeDB数据库
  const db = new Datastore({
    filename: dbFileName,
    autoload: true
  })
  _db = db
  return db
}

export function useDB() {
  console.log(_db)
  return _db
}
