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

  @Column({
    type: "varchar",
    length: 64,
    collation: "ja-x-icu"
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 64,
    default: ""
  })
  @Field()
  public shortName: string

  @Column("varchar", {
    length: 16,
    nullable: true
  })
  @Field({ nullable: true })
  public postNumber?: string

  @Column("varchar", {
    length: 64,
    nullable: true,
    array: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public address?: string[]

  @Column({
    ...id(),
    array: true,
    default: "{}",
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public memberIds: Person["id"][]

  @Column("boolean")
  @Field()
  public isOneself: boolean

  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public noteIds: string[]

  constructor(data: Partial<Company>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
