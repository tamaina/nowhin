// ログインユーザー
import { Entity, PrimaryColumn, Column, Index } from "typeorm"
import { id } from "../id"

@Entity("user")
export class DUser {
  @PrimaryColumn(id())
  public id: string

  @Index()
  @Column()
  public createdAt: Date

  @Index()
  @Column("varchar", {
    length: 256
  })
  public name: string

  @Index()
  @Column("varchar", {
    length: 128
  })
  public pwhash: string

  @Index()
  @Column("varchar", {
    length: 16
  })
  public i: string

  constructor(data: Partial<DUser>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
