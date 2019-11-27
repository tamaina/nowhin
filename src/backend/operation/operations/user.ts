import "reflect-metadata"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  name: string
}
