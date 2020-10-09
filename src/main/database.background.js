// * NeDB数据库

import path from 'path'
import Datastore from 'nedb'

export function initNeDB() {
  const dbFileName = path.join(process.cwd(), process.env.VUE_APP_DATA_PATH)
  // * 初始化NeDB数据库
  const db = new Datastore({
    filename: dbFileName,
    autoload: true
  })
  return db
}
