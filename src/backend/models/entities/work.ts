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

  @Column({ nullable: true })
  @Field({ nullable: true })
  public createdAt?: Date

  @Index()
  @Column({ nullable: true })
  @Field({ nullable: true })
  public lastOrderedAt?: Date

  @Column("varchar", {
    length: 256
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 128,
    array: true,
    default: "{}"
  })
  @Field(type => [String], {
    nullable: true
  })
  public identifiers?: string[]

  @Index()
  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public orderIds: DOrder["id"][]

  @Index()
  @Column("varchar", {
    ...id,
    array: true,
    default: "{}",
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
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
  @Field(type => Company, { nullable: true })
  public ordererCompany?: Company

  @ManyToOne(type => Person, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  @Field(type => Person, { nullable: true })
  public ordererPerson?: Person

  constructor(data: Partial<Work>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
