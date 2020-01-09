// ノート
import { Entity, PrimaryColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { id } from "../id"

@Entity("note")
@ObjectType()
export class Note {
  @PrimaryColumn(id())
  @Field(type => ID)
  public id: string

  @Index()
  @Column()
  @Field()
  public createdAt: Date

  @Column("text")
  @Field()
  public note: string

  constructor(data: Partial<Note>) {
    if (data == null) return

    for (const [k, v] of Object.entries(data)) {
      (this as any)[k] = v
    }
  }
}
