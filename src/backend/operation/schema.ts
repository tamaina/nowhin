import { buildSchema } from "type-graphql"
import { AUsers } from "./api/users"
import { AWorks } from "./api/works"
import { ACompanies } from "./api/companies"

export const schema = async () => {
  try {
    const s = await buildSchema({
      resolvers: [
        AUsers, AWorks, ACompanies
      ]
    })
    return s
  } catch(e) {
    console.error(e)
    throw e
  }
}
