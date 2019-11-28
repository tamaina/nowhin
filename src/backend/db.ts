import config from "../config"
import { createConnection, getConnection } from "typeorm"
import { entities } from "./models"

export function initDb() {
  try {
    const c = getConnection()
    return Promise.resolve(c)
  } catch (e) {}

  return createConnection({
    type: "postgres",
    ...config.db,
    synchronize: false,
    dropSchema: true,
    entities,
    logging: true
  })
}
