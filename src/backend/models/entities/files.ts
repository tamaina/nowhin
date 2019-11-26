// ファイル
import * as Nano from "nano"

export interface IFile extends Nano.MaybeDocument {
  uuid: string
  createdDate: Date
  name: string
  type: string
}

export class File implements IFile {
  _id: string
  _rev: string
  uuid: string
  createdDate: Date
  name: string
  type: string

  constructor(file: IFile) {
    this._id = undefined
    this._rev = undefined
    this.uuid = file.uuid
    this.createdDate = file.createdDate
    this.name = file.name
    this.type = file.type
  }
 
  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id
      this._rev = response.rev
    }
  }
}
