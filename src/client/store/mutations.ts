import db, { Tables } from "./db"
import { KeyValue } from "./types"

export function set(name: Tables) {
  return (state, x: { [x: string]: any }) => {
    const put = [] as KeyValue[]

    for (const [key, value] of Object.entries(x)) {
      put.push({ key, value: JSON.stringify(value) })
      state[key] = value
    }

    db[name].bulkPut(put)
  }
}
