import config from "../config"
import { createConnection, getConnection } from "typeorm"
import { entities } from "./models/entities"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

export function initDb() {
  try {
    const c = getConnection()
    console.log(c)
    return Promise.resolve(c)
  } catch (e) {
    console.log(e)
  }

  const option = {
    type: "postgres",
    ...config.db,
    synchronize: false,
    dropSchema: true,
    entities,
    logging: true,
    logger: "file"
  } as PostgresConnectionOptions

  console.log(option)

  return createConnection(option)
}
