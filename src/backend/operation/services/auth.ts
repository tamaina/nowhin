import { DUsers } from "../../models"

export const auth = async (i: string) => {
  const user = await DUsers.findOne({i})
  if (!user) throw Error("認証できませんでした。")
  return user
}
