// 請求書
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { Company } from "./company"
import { Order } from "./order"
import { Person } from "./person"

@Entity("bill")
@ObjectType()
export class Bill {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Index()
  @Column()
  @Field()
  public createdAt: Date

  @ManyToOne(type => Company, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  @Field(type => Company, {
    nullable: true
  })
  public ordererCompany?: Company

  @ManyToOne(type => Person, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  @Field(type => Person, {
    nullable: true
  })
  public ordererPerson?: Person

  @Index()
  @Column("varchar", {
    ...id(),
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public orderIds: Order["id"][]

  @ManyToMany(type => Order)
  @JoinColumn()
  @Field(type => [Order])
  public orders: Order[]

  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public noteIds: string[]

  constructor(data: Partial<Bill>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
