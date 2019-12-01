import { Resolver, Query, Arg, Mutation } from "type-graphql"
import { AUser, AUserSignin } from "../schema/user"
import { DUsers } from "../../../models"
import { compare } from "bcryptjs"
import { makeUser } from "../../services/makeUser"

@Resolver()
export class AUsers {
  // ...
  @Query(returns => AUser)
  async user(
    @Arg("name", { nullable: true }) name?: string,
    @Arg("id", { nullable: true }) id?: string
  ): Promise<AUser> {
    const query = {} as { name?: string, id?: string }
    if (name) query.name = name
    else if (id) query.id = id
    else throw Error("いずれかの引数を渡してください。")

    return DUsers.findOne(query).then(res => {
      if (!res) throw Error("ユーザーは見つかりませんでした。")
      const { id, createdAt, name } = res
      return { id, createdAt, name }
    })
  }

  @Mutation(returns => AUserSignin)
  async signin(
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUserSignin> {
    const user = await DUsers.findOne({ name })
    if (!user) throw Error("ユーザーが見つかりませんでした。")

    const same = await compare(password, user.pwhash!)
    if (!same) throw Error("パスワードが違います。")

    return { i: user.i }
  }

  @Mutation(returns => AUser)
  async addUser(
    @Arg("i") i: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUser> {
    DUsers.findOne({ i })

    const { id, createdAt } = await makeUser({ name, password })
    return { id, createdAt, name }
  }
}
