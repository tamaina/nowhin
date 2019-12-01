import config from "./src/config/"
import { entities } from "./src/backend/models/entities"

module.exports = {
  type: "postgres",
  ...config.db,
  entities,
  logging: true,
  migrations: ["migration/*.ts"],
  cli: {
    migrationsDir: "migration"
  }
}
