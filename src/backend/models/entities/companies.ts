// 会社
import * as Nano from "nano"

export interface ICompany extends Nano.MaybeDocument {
  name: string
  shortName: string
  post: string
  address: string[]
}

export class Company implements ICompany {
  _id: string
  _rev: string
  name: string
  shortName: string
  post: string
  address: string[]

  constructor(company: ICompany) {
    this._id = undefined
    this._rev = undefined
    this.name = company.name
    this.shortName = company.shortName
    this.post = company.post
    this.address = company.address
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
