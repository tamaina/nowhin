import Dexie from "dexie"
import { stringsToEnumObj } from "../../misc/stringsToEnumObj"
import { KeyValue } from "./types"

const tables = ["root", "me"]

const tablesObj = stringsToEnumObj(tables)
export type Tables = keyof typeof tablesObj

class Db extends Dexie {
  root: Dexie.Table<KeyValue, string>
  me: Dexie.Table<KeyValue, string>

  constructor (dbname: string = "db") {
      super(dbname)

      this.version(1).stores({
          root: "++key, value",
          me: "++key, value"
      })

      for (const table of tables) {
        this[table] = this.table(table)
      }
  }
}

const db = new Db()

export default db
