import "reflect-metadata"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class AUser {
  @Field()
  i: string

  @Field()
  id: string

  @Field()
  name: string
}
