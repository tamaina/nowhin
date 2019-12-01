import config from "../config"
import { createConnection, getConnection } from "typeorm"
import { entities } from "./models/entities"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

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
    entities,
    logging: true,
    logger: "file"
  })
}
