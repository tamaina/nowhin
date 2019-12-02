import { buildSchema } from "type-graphql"
import { AUsers } from "./api/users"

export const schema = () => buildSchema({
  resolvers: [
    AUsers
  ]
})
