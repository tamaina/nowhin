import db, { Tables } from "./db"

export function set(name: Tables) {
  return (state, x: { [x: string]: any }) => {
    const put = [] as { key: string, value: any }[]

    for (const [key, value] of Object.entries(x)) {
      put.push({ key, value })
      state[key] = value
    }

    db[name].bulkPut(put)
  }
}
