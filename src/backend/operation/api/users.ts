import "reflect-metadata"
import { Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql"
import { DUsers } from "../../models"
import { compare } from "bcryptjs"
import { makeUser } from "../services/makeUser"

@ObjectType()
class AUser {
  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  name: string
}

@ObjectType()
class AUserSignin {
  @Field(type => ID)
  i: string
}

@Resolver()
export class AUsers {
  @Query(returns => AUser)
  async "user"(
    @Arg("name", { nullable: true }) _name?: string,
    @Arg("id", { nullable: true }) _id?: string
  ): Promise<AUser> {
    const query = {} as { name?: string, id?: string }
    if (_name) query.name = _name
    else if (_id) query.id = _id
    else throw Error("いずれかの引数を渡してください。")

    const { id, createdAt, name } = await DUsers.findOne(query)

    return { id, createdAt, name }
  }

  @Query(returns => AUserSignin)
  async "signin"(
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUserSignin> {
    const user = await DUsers.findOne({ name })
    if (!user) throw Error("ユーザーが見つかりませんでした。")

    const same = await compare(password, user.pwhash!)
    if (!same) throw Error("パスワードが違います。")

    return { i: user.i }
  }

  @Query(returns => AUser)
  async "users:add"(
    @Arg("i") i: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUser> {
    if (!(await DUsers.findOne({ i }))) throw Error("認証できませんでした。")

    const { id, createdAt } = await makeUser({ name, password })
    return { id, createdAt, name }
  }
}
