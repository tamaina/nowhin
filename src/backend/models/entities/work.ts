// 仕事
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { Company } from "./company"
import { Person } from "./person"
import { DriveFile } from "./driveFile"
import { Order } from "./order"

@Entity()
export class Work {
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
  @Column({
    ...id,
    array: true
  })
  public orderIds: Order["id"][]

  @Index()
  @Column({
    ...id,
    array: true,
    default: "{}"
  })
  public fileIds: DriveFile["id"][]

  @Column("varchar", {
    length: 8192
  })
  public memo: string

  @ManyToOne(type => Company, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  public ordererCompany?: Company

  @ManyToOne(type => Person, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  public ordererPerson?: Person

  constructor(data: Partial<Work>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
