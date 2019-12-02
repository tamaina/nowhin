import "reflect-metadata"
import { Resolver, Query, Arg, Int, ObjectType, Field } from "type-graphql"
import { DCompanies } from "../../models"
import { auth } from "../services/auth"
import { genEAID12 } from "../../misc/genEAID12"
import { Company } from "../../models/entities/company"
import { Person } from "../../models/entities/person"

@ObjectType()
class ManyCompanies {
  @Field()
  companies: Company[]

  @Field()
  hasNextPage: boolean
}

@Resolver(of => Company)
export class ACompanies {
  @Query(returns => Company)
  async "companies:create"(
    @Arg("name") name: string,
    @Arg("shortName", { defaultValue: name }) shortName: string,
    @Arg("members", { defaultValue: [] }) members: Person["id"][],
    @Arg("postNumber", { defaultValue: null }) postNumber: string,
    @Arg("address", { defaultValue: null }) _address: string[] | string
  ): Promise<Company> {
    const address = typeof _address === "string" ? [_address] : _address

    return DCompanies.save({
      id: genEAID12(),
      createdAt: new Date(),
      name,
      shortName,
      members,
      postNumber,
      address
    })
  }

  @Query(returns => Company)
  async "companies:update"(
    @Arg("id") id: string,
    @Arg("name", { defaultValue: null }) name?: string,
    @Arg("shortName", { defaultValue: null }) shortName?: string,
    @Arg("members", { defaultValue: null }) members?: Person["id"][],
    @Arg("postNumber", { defaultValue: null }) postNumber?: string,
    @Arg("address", { defaultValue: null }) _address?: string[] | string
  ): Promise<Company> {
    const address = typeof _address === "string" ? [_address] : _address

    const q = {} as Company

    if (id) q.id = id
    if (typeof name === "string") q.name = name
    if (typeof shortName === "string") q.shortName = shortName
    if (typeof members === "object") q.memberIds = members
    if (typeof postNumber === "string") q.postNumber = postNumber
    if (typeof address === "object") q.address = address

    return DCompanies.save(q)
  }

  @Query(returns => Company)
  async "companies:show"(
    @Arg("id") id: string
  ): Promise<Company> {
    return await DCompanies.findOne({ id })
  }

  @Query(returns => [Company])
  async "companies:search"(
    @Arg("i") i: string,
    @Arg("skip", type => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", type => Int, { defaultValue: 15 }) take: number,
    @Arg("text", { nullable: true }) text?: string,
    @Arg("memberId", { nullable: true }) memberId?: string
  ): Promise<ManyCompanies> {
    await auth(i)

    let b = DCompanies.createQueryBuilder("company")

    if (text) {
      if (memberId) throw Error("text以外の引数は無視されます。")

      const q = `%${text}%`
      b.where(`COLLATE und-x-icu company.name like :q`, { q })
    } else if (memberId) {
      b.where(`:id = ANY (company.memberIds)`, { id: memberId })
    } else {
      throw Error("いずれかの引数を渡してください。")
    }

    const many = await b.skip(skip).take(take + 1).getMany()
    const hasNextPage = many.length === take + 1
    return {
      hasNextPage,
      companies: hasNextPage ? many.slice(0, -1) : many
    }
  }
}
