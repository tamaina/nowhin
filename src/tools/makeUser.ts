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
]).then(makeUser)
.then(({ id }) => DUsers.findOne({ id }))
.then(res => console.log("findOne", res))
