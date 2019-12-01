import { initDb } from "../backend/db"
import 'reflect-metadata'

initDb().then(() => {
  require(`./${process.argv[2]}`).default()
})
