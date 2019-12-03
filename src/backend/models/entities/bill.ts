// 請求書
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { Company } from "./company"
import { Person } from "./person"
import { DOrder } from "./order"

@Entity("bill")
export class DBill {
  @PrimaryColumn(id())
  public id: string

  @Index()
  @Column()
  public createdAt: Date

  @ManyToOne(type => Company, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  public ordererCompany?: Promise<Company>

  @ManyToOne(type => Person, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  public ordererPerson?: Promise<Person>

  @Index()
  @Column("varchar", {
    ...id(),
    array: true,
    nullable: true
  })
  public orderIds: DOrder["id"][]

  @Column("varchar", {
    length: 8192
  })
  public memo: string

  constructor(data: Partial<DBill>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
