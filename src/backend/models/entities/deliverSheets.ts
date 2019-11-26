// 納品書
import * as Nano from "nano"

export interface IDeliverSheet extends Nano.MaybeDocument {
  toCompany: string
  toPerson?: string
  orders: string[]
}

export class DeliverSheet implements IDeliverSheet {
  _id: string
  _rev: string
  toCompany: string
  toPerson?: string
  orders: string[]

  constructor(deliverSheet: IDeliverSheet) {
    this._id = undefined
    this._rev = undefined
    this.toCompany = deliverSheet.toCompany
    this.toPerson = deliverSheet.toPerson
    this.orders = deliverSheet.orders
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
