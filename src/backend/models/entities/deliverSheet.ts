// 納品書
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DCompany } from "./company"
import { DOrder } from "./order"
import { DPerson } from "./person"

@Entity()
export class DDeliverSheet {
  @PrimaryColumn(id())
  public id: string

  @Index()
  @Column()
  public createdAt: Date

  @ManyToOne(type => DCompany, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  public ordererCompany?: DCompany

  @ManyToOne(type => DPerson, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  public ordererPerson?: DPerson

  @Index()
  @Column("varchar", {
    ...id(),
    array: true
  })
  public orderIds: DOrder["id"][]

  @Column("varchar", {
    length: 8192
  })
  public memo: string

  constructor(data: Partial<DDeliverSheet>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
