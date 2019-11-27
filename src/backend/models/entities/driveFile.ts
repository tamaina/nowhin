// ファイル
import { Entity, PrimaryColumn, Column } from "typeorm"
import { id } from "../id"

@Entity()
export class DriveFile {
  @PrimaryColumn(id())
  public id: string

  @Column()
  public createdAt: Date

  @Column("varchar", {
    length: 256
  })
  public name: string

  @Column("varchar", {
    length: 24
  })
  public type: string

  constructor(data: Partial<DriveFile>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
