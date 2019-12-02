import "reflect-metadata"
import { Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql"
import { DUsers, DWorks } from "../../models"
import { compare } from "bcryptjs"
import { makeUser } from "../services/makeUser"
import * as Moji from "@eai/moji"

@ObjectType()
export class AWork {
  @Field(type => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  name: string

  @Field()
  identifiers: string[]

  @Field()
  orderIds: AOrder["id"][]

  @Field()
  fileIds: ADriveFile["id"][]

  @Field()
  memo: string

  @Field()
  ordererCompany?: ACompany

  @Field()
  ordererPerson?: APerson
}

@Resolver()
export class AWorks {
  @Query(returns => AWork)
  async "works"(
    @Arg("id", { nullable: true }) id: string
  ): Promise<AWork> {
    return await DWorks.findOne({ id })
  }

  @Query(returns => [AWork])
  async "works:search"(
    @Arg("i", { nullable: true }) i: string,
    @Arg("text", { nullable: true }) _text?: string,
    @Arg("fileId", { nullable: true }) _fileId?: string,
    @Arg("ordererCompanyId", { nullable: true }) _ordererCompanyId?: string,
    @Arg("ordererPersonId", { nullable: true }) _ordererPersonId?: string
  ): Promise<AWork[]> {
    if (!(await DUsers.findOne({ i }))) throw Error("認証できませんでした。")

    if (_text) {
      const q = `%${_text}%`
      return DWorks.createQueryBuilder("work")
        .where(`user.name like :q`, { q })
        .orWhere(`user.identifiers like :q`, { q })
        .getMany()
    } else if (_fileId) {
      return DWorks.createQueryBuilder("work")
        .where(`user.fileIds >@ :id`, { id: _fileId })
        .getMany()
    }

  }
}
