// 設定
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"
import { DriveFile } from "./driveFile"
import { Company } from "./company"

@Entity("meta")
@ObjectType()
export class Meta {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column(Object.assign({ nullable: true }, id()))
  @Field({ nullable: true })
  public myCompanyId?: Company["id"] | null

  @OneToOne(type => Company, {
    nullable: true
  })
  @JoinColumn()
  @Field(type => Company, { nullable: true })
  public myCompany?: Company | null

  @Column(Object.assign({ nullable: true }, id()))
  @Field({ nullable: true })
  public bannerId?: DriveFile["id"] | null

  @OneToOne(type => DriveFile, { nullable: true })
  @JoinColumn()
  @Field(type => DriveFile, { nullable: true })
  public banner?: DriveFile | null

  constructor(data: Partial<Meta>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
