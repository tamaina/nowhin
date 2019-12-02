// ファイル
import { Entity, PrimaryColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"

@Entity("drive_file")
@ObjectType()
export class DriveFile {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Column()
  @Field()
  public createdAt: Date

  @Column("varchar", {
    length: 256
  })
  @Field()
  public name: string

  @Column("varchar", {
    length: 24
  })
  @Field()
  public type: string

  constructor(data: Partial<DriveFile>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
