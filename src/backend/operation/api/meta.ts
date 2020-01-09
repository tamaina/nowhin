import { Resolver, Query, Arg, Int, ObjectType, Field } from "type-graphql"
import { DMetas, DCompanies, DDriveFiles } from "../../models"
import { Meta } from "../../models/entities/meta"
import { genEAID12 } from "../../misc/genEAID12"

const defaultMeta = (): Meta => {
  return {
    id: genEAID12()
  }
}

@ObjectType()
@Resolver(of => Meta)
export class AMetas {
  @Query(returns => Meta)
  async metaGet(): Promise<Meta> {
    return (await DMetas.findOne()) || DMetas.save(defaultMeta())
  }

  @Query(returns => Meta)
  async metaUpdate(
    @Arg("myCompanyId", type => String, { nullable: true }) myCompanyId?: string,
    @Arg("bannerId", type => String, { nullable: true }) bannerId?: string,
  ): Promise<Meta> {
    const m = (await DMetas.findOne()) || defaultMeta()

    if (typeof myCompanyId === "string") m.myCompany = await DCompanies.findOne(myCompanyId)
    if (typeof bannerId === "string") {
      m.bannerId = bannerId
      m.banner = await DDriveFiles.findOne(bannerId)
    }
    return DMetas.save(m)
  }
}
