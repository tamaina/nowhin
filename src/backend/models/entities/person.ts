// 担当者
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { Company } from "./company"

@Entity("person")
@ObjectType()
export class Person {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column()
  @Field()
  public createdAt: Date

  @Column({
    type: "varchar",
    length: 128,
    collation: "ja-x-icu"
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 128
  })
  @Field()
  public position: string

  @ManyToOne(type => Company, company => company.memberIds, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  @Field(type => Company)
  public company: Company

  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public noteIds: string[]

  constructor(data: Partial<Person>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
