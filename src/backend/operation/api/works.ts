import "reflect-metadata"
import { Resolver, Query, Arg, Int, ObjectType, Field } from "type-graphql"
import { DWorks, DCompanies, DPeople } from "../../models"
import { auth } from "../services/auth"
import { Work } from "../../models/entities/work"
import { genEAID12 } from "../../misc/genEAID12"
import { Company } from "../../models/entities/company"
import { Person } from "../../models/entities/person"
import { DOrder } from "../../models/entities/order"
import { DriveFile } from "../../models/entities/driveFile"

@ObjectType()
class ManyWorks {
  @Field()
  works: Work[]

  @Field()
  hasNextPage: boolean
}

@Resolver(of => Work)
export class AWorks {
  @Query(returns => Work)
  async "works:create"(
    @Arg("name") name: string,
    @Arg("identifiers", { defaultValue: [] }) identifiers: string[],
    @Arg("memo", { defaultValue: "" }) memo: string,
    @Arg("orderIds", { defaultValue: [] }) orderIds: DOrder["id"][],
    @Arg("fileIds", { defaultValue: [] }) fileIds: DriveFile["id"][],
    @Arg("ordererCompanyId", { nullable: true }) ordererCompanyId?: Company["id"],
    @Arg("ordererPersonId", { nullable: true }) ordererPersonId?: Person["id"],
  ): Promise<Work> {
    return DWorks.save({
      id: genEAID12(),
      createdAt: new Date(),
      name,
      identifiers,
      memo,
      orderIds, fileIds,
      ordererCompany: ordererCompanyId ? await DCompanies.findOne({ id: ordererCompanyId }) : null,
      ordererPerson: ordererPersonId ? await DPeople.findOne({ id: ordererPersonId }) : null
    })
  }

  @Query(returns => Work)
  async "works:update"(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("identifiers", { nullable: true }) identifiers?: string[],
    @Arg("memo", { nullable: true }) memo?: string,
    @Arg("orderIds", { nullable: true }) orderIds?: string[],
    @Arg("fileIds", { nullable: true }) fileIds?: string[],
    @Arg("ordererCompanyId", { nullable: true }) ordererCompanyId?: Company["id"],
    @Arg("ordererPersonId", { nullable: true }) ordererPersonId?: Person["id"],
  ): Promise<Work> {
    const q = {} as Work

    if (id) q.id = id
    if (typeof name === "string") q.name = name
    if (typeof memo === "string") q.memo = memo
    if (typeof identifiers === "object") q.identifiers = identifiers
    if (typeof orderIds === "object") q.orderIds = orderIds
    if (typeof fileIds === "object") q.fileIds = fileIds
    if (ordererCompanyId === "") q.ordererCompany = null
    else if (typeof ordererCompanyId === "string") q.ordererCompany = await DCompanies.findOne({ id: ordererCompanyId })
    if (ordererPersonId === "") q.ordererCompany = null
    else if (typeof ordererPersonId === "string") q.ordererPerson = await DPeople.findOne({ id: ordererPersonId })

    return DWorks.save(q)
  }

  @Query(returns => Work)
  async "works:show"(
    @Arg("id") id: string
  ): Promise<Work> {
    return await DWorks.findOne({ id })
  }

  @Query(returns => [Work])
  async "works:search"(
    @Arg("i") i: string,
    @Arg("skip", type => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", type => Int, { defaultValue: 15 }) take: number,
    @Arg("text", { nullable: true }) text?: string,
    @Arg("fileId", { nullable: true }) fileId?: string,
    @Arg("ordererCompanyId", { nullable: true }) ordererCompanyId?: string,
    @Arg("ordererPersonId", { nullable: true }) ordererPersonId?: string,
  ): Promise<ManyWorks> {
    await auth(i)

    let b = DWorks.createQueryBuilder("work")

    if (text) {
      if (fileId || ordererPersonId || ordererCompanyId) throw Error("text以外の引数は無視されます。")

      const q = `%${text}%`
      b.where(`COLLATE und-x-icu :q = ANY (work.identifiers)`, { q })
        .orWhere(`COLLATE und-x-icu work.name like :q`, { q })
    } else if (fileId) {
      if (ordererPersonId || ordererCompanyId) throw Error("fileId以外の引数は無視されます。")

      b.where(`:id = ANY (work.fileIds)`, { id: fileId })
    } else if (ordererPersonId) {
      if (ordererPersonId) throw Error("ordererPersonId以外の引数は無視されます。")

      b.leftJoin("work.ordererPerson", "ordererPerson")
        .where("ordererPerson.id = :id", { id: ordererPersonId })
    } else if (ordererCompanyId) {
      b.leftJoin("work.ordererCompany", "ordererCompany")
        .where("ordererCompany.id = :id", { id: ordererCompanyId })
    } else {
      throw Error("いずれかの引数を渡してください。")
    }

    const many = await b.skip(skip).take(take + 1).getMany()
    const hasNextPage = many.length === take + 1
    return {
      hasNextPage,
      works: hasNextPage ? many.slice(0, -1) : many
    }
  }
}
