import { getRepository } from "typeorm"
import { Bill } from "./entities/bill"
import { Company } from "./entities/company"
import { DeliverSheet } from "./entities/deliverSheet"
import { DriveFile } from "./entities/driveFile"
import { Meta } from "./entities/meta"
import { Order } from "./entities/order"
import { Person } from "./entities/person"
import { User } from "./entities/user"
import { Work } from "./entities/work"

export const Bills = getRepository(Bill)
export const Companies = getRepository(Company)
export const DeliverSheets = getRepository(DeliverSheet)
export const DriveFiles = getRepository(DriveFile)
export const Metas = getRepository(Meta)
export const Orders = getRepository(Order)
export const People = getRepository(Person)
export const Users = getRepository(User)
export const Works = getRepository(Work)
