// 受注
import { Entity, PrimaryColumn, Column, Index, JoinColumn, ManyToOne } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { Work } from "./work"
import { Company } from "./company"

@Entity("order")
@ObjectType()
export class Order {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column()
  @Field()
  public createdAt: Date

  @Index()
  @Column({
    nullable: true
  })
  @Field()
  public orderedAt: Date | null

  @Index()
  @Column({
    nullable: true
  })
  @Field()
  public deliveredAt: Date | null

  @Index()
  @Column({
    nullable: true
  })
  @Field()
  public paidAt: Date | null

  @Index()
  @Column(id())
  @Field()
  public ordererId: Company["id"]

  @ManyToOne(type => Company)
  @JoinColumn()
  @Field(type => Company)
  public orderer : Company

  @Index()
  @Column(id())
  @Field()
  public receiverId: Company["id"]

  @ManyToOne(type => Company)
  @JoinColumn()
  @Field(type => Company)
  public receiver : Company

  @Index()
  @Column(id())
  @Field()
  public workId: Work["id"]

  @ManyToOne(type => Work)
  @JoinColumn()
  @Field(type => Work)
  public work : Work

  @Column("integer", {
    default: 1
  })
  @Field()
  public quantity: number

  @Column("integer")
  @Field()
  public unitPrice: number

  @Column("boolean")
  @Field()
  public salesTaxIsInPrice: boolean

  @Column("integer", {
    default: 10
  })
  @Field()
  public salesTax: number

  @Column("enum", {
    enum: ["notYetOrdered", "workInProgress", "delivered", "obsolete"]
  })
  @Field()
  public state: "notYetOrdered" | "workInProgress" | "delivered" | "obsolete"

  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  @Field(type => [String], {
    nullable: true
  })
  public noteIds: string[]

  constructor(data: Partial<Order>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
