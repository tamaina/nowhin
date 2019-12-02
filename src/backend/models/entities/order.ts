// 受注
import { Entity, PrimaryColumn, Column, Index, JoinColumn, ManyToOne } from "typeorm"
import { id } from "../id"
import { DWork } from "./work"

@Entity("order")
export class DOrder {
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
  public workId: DWork["id"]

  @ManyToOne(type => DWork)
  @JoinColumn()
  public work : DWork

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

  constructor(data: Partial<DOrder>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
