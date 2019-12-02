import * as inquirer from "inquirer"
import { makeUser } from "../backend/operation/services/makeUser"
import { DUsers } from "../backend/models"

export default () => inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "ユーザー名",
    default: "user"
  }, {
    type: "password",
    name: "password",
    message: "パスワード"
  }
]).then(makeUser).then(user => console.log("make", user))
.then(() => DUsers.findOne({ name: "user" }))
.then(res => console.log("findOne", res))
