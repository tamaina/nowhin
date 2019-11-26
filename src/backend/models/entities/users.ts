// ログインユーザー
import * as Nano from "nano"

export interface IUser extends Nano.MaybeDocument {
  name: string
  pwhash: string
  i: string
}

export class User implements IUser {
  _id: string
  _rev: string
  name: string
  pwhash: string
  i: string

  constructor(user: IUser) {
    this._id = undefined
    this._rev = undefined
    this.name = user.name
    this.pwhash = user.pwhash
    this.i = user.i
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
