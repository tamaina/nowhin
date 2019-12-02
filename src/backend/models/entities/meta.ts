// 設定
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DDriveFile } from "./driveFile"

@Entity("meta")
export class DMeta {
  @PrimaryColumn(id())
  public id: string

  @Column("varchar", {
    length: 128
  })
  public companyName: string

  @Column("varchar", {
    length: 128
  })
  public bannerId: DDriveFile["id"]

  @OneToOne(type => DDriveFile)
  @JoinColumn()
  public banner: DDriveFile

  constructor(data: Partial<DMeta>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
