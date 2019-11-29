import * as inquirer from "inquirer"
import { makeUser } from "../backend/operation/services/makeUser"
import 'reflect-metadata'
import { Users } from "../backend/models"

export default () => inquirer.prompt([
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
]).then(makeUser).then(user => console.log(user))
.then(() => Users.findOne({ name: "user" }))
.then(res => console.log(res))
