// 設定
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DriveFile } from "./driveFile"

@Entity()
export class Meta {
  @PrimaryColumn(id())
  public id: string

  @Column("varchar", {
    length: 128
  })
  public companyName: string

  @Column("varchar", {
    length: 128
  })
  public bannerId: DriveFile["id"]

  @OneToOne(type => DriveFile)
  @JoinColumn()
  public banner: DriveFile

  constructor(data: Partial<Meta>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
