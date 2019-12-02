import { getRepository } from "typeorm"
import { DBill } from "./entities/bill"
import { Company } from "./entities/company"
import { DDeliverSheet } from "./entities/deliverSheet"
import { DriveFile } from "./entities/driveFile"
import { DMeta } from "./entities/meta"
import { DOrder } from "./entities/order"
import { Person } from "./entities/person"
import { DUser } from "./entities/user"
import { Work } from "./entities/work"

export const DBills = getRepository(DBill)
export const DCompanies = getRepository(Company)
export const DDeliverSheets = getRepository(DDeliverSheet)
export const DDriveFiles = getRepository(DriveFile)
export const DMetas = getRepository(DMeta)
export const DOrders = getRepository(DOrder)
export const DPeople = getRepository(Person)
export const DUsers = getRepository(DUser)
export const DWorks = getRepository(Work)
