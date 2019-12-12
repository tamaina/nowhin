import Dexie from "dexie"
import { stringsToEnumObj } from "../../misc/stringsToEnumObj"

type KeyValue = { key: string, value: string }

class Db extends Dexie {
  root: Dexie.Table<KeyValue, string>
  me: Dexie.Table<KeyValue, string>

  constructor (dbname: string = "db") {
      super(dbname)
      this.version(1).stores({
          root: "++key, value",
          me: "++key, value"
      })

      this.root = this.table("root")
      this.me = this.table("me")
  }
}

export default new Db()

const tables = stringsToEnumObj(["root", "me"])
export type Tables = keyof typeof tables
