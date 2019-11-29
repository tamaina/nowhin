import rndstr from 'rndstr'
import { hash } from "bcryptjs"
import { Users } from "../../models/"
import { User } from "../../models/entities/user"
import { genEAID12 } from "../../misc/genEAID12"

export async function makeUser({ name, password }: { name: string, password: string }) {
  const pwhash = await hash(password, 16)

  return Users.create(new User({
    id: genEAID12(),
    createdAt: new Date(),
    name,
    pwhash,
    i: rndstr('a-zA-Z0-9', 16)
  }))
}
