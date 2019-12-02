// 会社
import { Entity, PrimaryColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { Person } from "./person"

@Entity("company")
@ObjectType()
export class Company {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column()
  @Field()
  public createdAt: Date

  @Column("varchar", {
    length: 64
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 64
  })
  @Field()
  public shortName: string

  @Column("varchar", {
    length: 16,
    nullable: true
  })
  @Field()
  public postNumber?: string

  @Column("varchar", {
    length: 64,
    nullable: true,
    array: true
  })
  @Field(type => [String])
  public address?: string[]

  @Column({
    ...id(),
    array: true,
    default: "{}"
  })
  @Field(type => [String])
  public memberIds: Person["id"][]

  constructor(data: Partial<Company>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
