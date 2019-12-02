// 仕事
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { Company } from "./company"
import { Person } from "./person"
import { DriveFile } from "./driveFile"
import { DOrder } from "./order"

@Entity("work")
@ObjectType()
export class Work {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column()
  @Field()
  public createdAt: Date

  @Index()
  @Column()
  @Field()
  public lastOrderedAt: Date

  @Column("varchar", {
    length: 256
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 128,
    array: true
  })
  @Field(type => [String])
  public identifiers: string[]

  @Index()
  @Column("varchar", {
    ...id,
    array: true
  })
  @Field(type => [String])
  public orderIds: DOrder["id"][]

  @Index()
  @Column("varchar", {
    ...id,
    array: true,
    default: "{}"
  })
  @Field(type => [String])
  public fileIds: DriveFile["id"][]

  @Column("varchar", {
    length: 8192
  })
  @Field()
  public memo: string

  @ManyToOne(type => Company, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  @Field(type => Company)
  public ordererCompany?: Company

  @ManyToOne(type => Person, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  @Field(type => Person)
  public ordererPerson?: Person

  constructor(data: Partial<Work>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
