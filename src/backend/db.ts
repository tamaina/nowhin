import config from "../config"
import { getConnection, createConnection } from "typeorm"

export function initDb() {
  try {
    const c = getConnection()
    return Promise.resolve(c)
  } catch (e) {}

  return createConnection({
    type: "postgres",
    ...config.db,
    synchronize: false,
    dropSchema: false,
    cache: {
      type: "ioredis",
      options: config.redis
    }
  })
}