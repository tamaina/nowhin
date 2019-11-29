const config = require("./built/config/").default
const { entities } = require("./built/backend/models/entities")

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
