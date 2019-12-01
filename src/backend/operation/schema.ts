import { buildSchema } from "type-graphql"
import { AUsers } from "./api/resolver/users"

export const schema = () => buildSchema({
  resolvers: [
    AUsers
  ]
})
