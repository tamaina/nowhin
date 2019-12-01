import * as inquirer from "inquirer"
import { makeUser } from "../backend/operation/services/makeUser"
import { DUsers } from "../backend/models"

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
]).then(makeUser).then(user => console.log("make", user))
.then(() => DUsers.findOne({ name: "user" }))
.then(res => console.log("findOne", res))
