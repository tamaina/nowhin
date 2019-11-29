import { initDb } from "../backend/db"

initDb().then(() => {
  require(`./${process.argv[2]}`).default()
})
