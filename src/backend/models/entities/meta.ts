// 設定
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { id } from "../id"
import { DriveFile } from "./driveFile"
import { Company } from "./company"

@Entity("meta")
export class DMeta {
  @PrimaryColumn(id())
  
  public id: string

  @OneToOne(type => Company)
  @JoinColumn()
  public myCompany: Company

  @Column("varchar", {
    length: 128
  })
  public bannerId: DriveFile["id"]

  @OneToOne(type => DriveFile)
  @JoinColumn()
  public banner: DriveFile

  @Column("varchar", {
    ...id,
    array: true,
    nullable: true
  })
  /*@Field(type => [String], {
    nullable: true
  })*/
  public noteIds: string[]

  constructor(data: Partial<DMeta>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
