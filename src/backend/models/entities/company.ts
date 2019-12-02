// 会社
import { Entity, PrimaryColumn, Column } from "typeorm"
import { id } from "../id"
import { DPerson } from "./person"

@Entity("company")
export class DCompany {
  @PrimaryColumn(id())
  public id: string

  @Column()
  public createdAt: Date

  @Column("varchar", {
    length: 64
  })
  public name: string

  @Column("varchar", {
    length: 64
  })
  public shortName: string

  @Column("varchar", {
    length: 16
  })
  public post: string

  @Column("varchar", {
    length: 64,
    array: true
  })
  public address: string[]

  @Column({
    ...id(),
    array: true,
    default: "{}"
  })
  public members: DPerson["id"][]

  constructor(data: Partial<DCompany>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
