import "reflect-metadata"
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
export class AUser {
  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  name: string
}

@ObjectType()
export class AUserSignin {
  @Field(type => ID)
  i: string
}
