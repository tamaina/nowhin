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
  @Field(type => [Work])
  works: Work[]

  @Field()
  hasNextPage: boolean
}

@Resolver(of => Work)
export class AWorks {
  @Query(returns => Work)
  async workCreate(
    @Arg("name", type => String) name: string,
    @Arg("identifiers", type => [String], { defaultValue: [] }) identifiers: string[],
    @Arg("memo", { defaultValue: "" }) memo: string,
    @Arg("orderIds", type => [String], { defaultValue: [] }) orderIds: DOrder["id"][],
    @Arg("fileIds", type => [String], { defaultValue: [] }) fileIds: DriveFile["id"][],
    @Arg("ordererCompanyId", type => String, { nullable: true }) ordererCompanyId?: Company["id"],
    @Arg("ordererPersonId", type => String, { nullable: true }) ordererPersonId?: Person["id"],
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
  async workUpdate(
    @Arg("id") id: string,
    @Arg("name", type => String, { nullable: true }) name?: string,
    @Arg("identifiers", type => [String], { nullable: true }) identifiers?: string[],
    @Arg("memo", { nullable: true }) memo?: string,
    @Arg("orderIds", type => [String], { nullable: true }) orderIds?: string[],
    @Arg("fileIds", type => [String], { nullable: true }) fileIds?: DriveFile["id"][],
    @Arg("ordererCompanyId", type => String, { nullable: true }) ordererCompanyId?: Company["id"],
    @Arg("ordererPersonId", type => String, { nullable: true }) ordererPersonId?: Person["id"],
  ): Promise<Work> {
    const q = { id } as Work

    console.log("name", name)
    console.log("memo", memo)
    console.log("identifiers", identifiers)
    console.log("ordererCompanyId", ordererCompanyId)
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
  async workShow(
    @Arg("id") id: string
  ): Promise<Work> {
    return await DWorks.findOne({ id })
  }

  @Query(returns => [Work])
  async worksSearch(
    @Arg("i") i: string,
    @Arg("skip", type => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", type => Int, { defaultValue: 15 }) take: number,
    @Arg("text", { nullable: true }) text?: string,
    @Arg("fileId", { nullable: true }) fileId?: string,
    @Arg("ordererCompanyId", type => String, { nullable: true }) ordererCompanyId?: Company["id"],
    @Arg("ordererPersonId", type => String, { nullable: true }) ordererPersonId?: Person["id"],
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
