import rndstr from 'rndstr'
import { hash } from "bcryptjs"
import { DUsers } from "../../models/"
import { genEAID12 } from "../../misc/genEAID12"

export async function makeUser({ name, password }: { name: string, password: string }) {
  const pwhash = await hash(password, 16)

  return DUsers.save({
    id: genEAID12(),
    createdAt: new Date(),
    name,
    pwhash,
    i: rndstr('a-zA-Z0-9', 16)
  })
}
