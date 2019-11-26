// 受注
import * as Nano from "nano"

export interface IOrder extends Nano.MaybeDocument {
  orderedDate?: Date
  deliveredDate?: Date
  work: string
  quantity: number
  unitPrice: number
  salesTax: number | boolean
  state: "notYetOrdered" | "working" | "delivered"
}

export class Order implements IOrder {
  _id: string
  _rev: string
  orderedDate?: Date
  deliveredDate?: Date
  work: string
  quantity: number
  unitPrice: number

  constructor(order: IOrder) {
    this._id = undefined
    this._rev = undefined
    this.orderedDate = order.orderedDate
    this.deliveredDate = order.deliveredDate
    this.work = order.work
    this.quantity = order.quantity
    this.unitPrice = order.unitPrice
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
