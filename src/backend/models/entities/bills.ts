// 請求書
import * as Nano from "nano"

export interface IBill extends Nano.MaybeDocument {
  toCompany: string
  toPerson?: string
  orders: string[]
}

export class Bill implements IBill {
  _id: string
  _rev: string
  toCompany: string
  toPerson?: string
  orders: string[]

  constructor(bill: IBill) {
    this._id = undefined
    this._rev = undefined
    this.toCompany = bill.toCompany
    this.toPerson = bill.toPerson
    this.orders = bill.orders
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
