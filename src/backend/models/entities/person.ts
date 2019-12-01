// 担当者
// ファイル
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DCompany } from "./company"

@Entity()
export class DPerson {
  @PrimaryColumn(id())
  public id: string

  @Column()
  public createdAt: Date

  @Column("varchar", {
    length: 128
  })
  public name: string

  @Column("varchar", {
    length: 128
  })
  public position: string

  @ManyToOne(type => DCompany, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  public company: DCompany

  constructor(data: Partial<DPerson>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
