// 担当者
// ファイル
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { Company } from "./company"

@Entity()
export class Person {
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

  @Column("varchar", {
    ...id()
  })
  public companyId: Company["id"]

  constructor(data: Partial<Person>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
