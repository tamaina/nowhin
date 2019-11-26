// 仕事
import * as Nano from "nano"

export interface IWork extends Nano.MaybeDocument {
  name: string
  identifiers: string[]
  memo: string
  files: string[]
  lastOrderedAt: Date
  ordererCompany?: string
  ordererPerson?: string
}

export class Work implements IWork {
  _id: string
  _rev: string
  name: string
  identifiers: string[]
  memo: string
  files: string[]
  lastOrderedAt: Date
  ordererCompany?: string
  ordererPerson?: string

  constructor(work: IWork) {
    this._id = undefined
    this._rev = undefined
    this.name = work.name
    this.identifiers = work.identifiers
    this.memo = work.memo
    this.files = work.files
    this.lastOrderedAt = work.lastOrderedAt
    this.ordererCompany = work.ordererCompany
    this.ordererPerson = work.ordererPerson
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
