import { DUsers } from "../../models"

export const auth = async (i: string) => {
  if (!(await DUsers.findOne({i}))) throw Error("認証できませんでした。")
  return
}
