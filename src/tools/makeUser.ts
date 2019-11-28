import * as inquirer from "inquirer"
import { makeUser } from "../backend/operation/services/makeUser"
import { initDb } from "../backend/db"
import 'reflect-metadata'

initDb().then(() => inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "name",
    default: "user"
  }, {
    type: "input",
    name: "password",
    message: "password"
  }
])).then(makeUser).then(user => console.log(user))
