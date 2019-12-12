import { Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql"
import { DUsers } from "../../models"
import { compare } from "bcryptjs"
import { makeUser } from "../services/makeUser"
import { auth } from "../services/auth"
import { hash } from "bcryptjs"
import rndstr from "rndstr"

@ObjectType()
class AUser {
  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  name: string

  @Field()
  i?: string
}

@Resolver(of => AUser)
export class AUsers {
  @Query(returns => AUser)
  async user(
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

  @Query(returns => AUser)
  async signin(
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUser> {
    const user = await DUsers.findOne({ name })
    if (!user) throw Error("ユーザーが見つかりませんでした。")

    const same = await compare(password, user.pwhash!)
    if (!same) throw Error("パスワードが違います。")

    delete user.pwhash
    return user
  }

  @Query(returns => AUser)
  async signup(
    @Arg("i") i: string,
    @Arg("name") name: string,
    @Arg("password") password: string
  ): Promise<AUser> {
    await auth(i)

    const { id, createdAt } = await makeUser({ name, password })
    return { id, createdAt, name }
  }

  @Query(returns => AUser)
  async passwordUpdate(
    @Arg("i") i: string,
    @Arg("password") password: string
  ): Promise<AUser> {
    const user = await auth(i)
    user.pwhash = await hash(password, 8)
    user.i = rndstr('a-zA-Z0-9', 16)
    const { id, createdAt } = await DUsers.save({})
    return { id, createdAt, name, i }
  }
}
