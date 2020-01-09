import { getRepository } from "typeorm"
import { Bill } from "./entities/bill"
import { Company } from "./entities/company"
import { DeliverSheet } from "./entities/deliverSheet"
import { DriveFile } from "./entities/driveFile"
import { Meta } from "./entities/meta"
import { Order } from "./entities/order"
import { Person } from "./entities/person"
import { DUser } from "./entities/user"
import { Work } from "./entities/work"

export const DBills = getRepository(Bill)
export const DCompanies = getRepository(Company)
export const DDeliverSheets = getRepository(DeliverSheet)
export const DDriveFiles = getRepository(DriveFile)
export const DMetas = getRepository(Meta)
export const DOrders = getRepository(Order)
export const DPeople = getRepository(Person)
export const DUsers = getRepository(DUser)
export const DWorks = getRepository(Work)
