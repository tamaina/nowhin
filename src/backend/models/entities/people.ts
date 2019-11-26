// 担当者
import * as Nano from "nano"

export interface IPerson extends Nano.MaybeDocument {
  name: string[]
  belongsTo: string
  position: string
}

export class Person implements IPerson {
  _id: string
  _rev: string
  name: string[]
  belongsTo: string
  position: string

  constructor(person: IPerson) {
    this._id = undefined
    this._rev = undefined
    this.name = person.name
    this.belongsTo = person.belongsTo
    this.position = person.position
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
