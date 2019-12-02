// 仕事
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DCompany } from "./company"
import { DPerson } from "./person"
import { DDriveFile } from "./driveFile"
import { DOrder } from "./order"

@Entity("work")
export class DWork {
  @PrimaryColumn(id())
  public id: string

  @Column()
  public createdAt: Date

  @Index()
  @Column()
  public lastOrderedAt: Date

  @Column("varchar", {
    length: 256
  })
  public name: string

  @Column("varchar", {
    length: 128,
    array: true
  })
  public identifiers: string[]

  @Index()
  @Column("varchar", {
    ...id,
    array: true
  })
  public orderIds: DOrder["id"][]

  @Index()
  @Column("varchar", {
    ...id,
    array: true,
    default: "{}"
  })
  public fileIds: DDriveFile["id"][]

  @Column("varchar", {
    length: 8192
  })
  public memo: string

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

  constructor(data: Partial<DWork>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
