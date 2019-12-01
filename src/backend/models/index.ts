import { getRepository } from "typeorm"
import { DBill } from "./entities/bill"
import { DCompany } from "./entities/company"
import { DDeliverSheet } from "./entities/deliverSheet"
import { DDriveFile } from "./entities/driveFile"
import { DMeta } from "./entities/meta"
import { DOrder } from "./entities/order"
import { DPerson } from "./entities/person"
import { DUser } from "./entities/user"
import { DWork } from "./entities/work"

export const DBills = getRepository(DBill)
export const DCompanies = getRepository(DCompany)
export const DDeliverSheets = getRepository(DDeliverSheet)
export const DDriveFiles = getRepository(DDriveFile)
export const DMetas = getRepository(DMeta)
export const DOrders = getRepository(DOrder)
export const DPeople = getRepository(DPerson)
export const DUsers = getRepository(DUser)
export const DWorks = getRepository(DWork)
