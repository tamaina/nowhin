const config = require("./built/config").default
const { entities } = require("./built/backend/models/");

module.exports = {
  type: "postgres",
  ...config.db,
  entities,
  migrations: ["migration/*.ts"],
  cli: {
    migrationsDir: "migration"
  }
}
