// 受注
import { Entity, PrimaryColumn, Column, Index, JoinColumn, OneToOne } from "typeorm"
import { id } from "../id"
import { Company } from "./company"
import { Work } from "./work"

@Entity()
export class Order {
  @PrimaryColumn(id())
  public id: string

  @Column()
  public createdAt: Date

  @Index()
  @Column({
    nullable: true
  })
  public orderedAt: Date | null

  @Index()
  @Column({
    nullable: true
  })
  public deliveredAt: Date | null

  @Index()
  @Column(id())
  public workId: Work["id"]

  @OneToOne(type => Work)
  @JoinColumn()
  public work : Work

  @Column("integer", {
    default: 1
  })
  public quantity: number

  @Column("integer")
  public unitPrice: number

  @Column("boolean")
  public salesTaxIsInPrice: boolean

  @Column("integer", {
    default: 10
  })
  public salesTax: number

  @Column("varchar", {
    length: 16
  })
  public state: "notYetOrdered" | "workInProgress" | "delivered" | "obsolete"

  constructor(data: Partial<Order>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
