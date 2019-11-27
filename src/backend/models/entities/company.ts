// 会社
import { Entity, PrimaryColumn, Column } from "typeorm"
import { id } from "../id"
import { Person } from "./person"

@Entity()
export class Company {
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
  public members: Person["id"][]

  constructor(data: Partial<Company>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
