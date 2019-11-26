import { readdirSync } from "fs"
import { resolve, basename } from "path"

export const getEntitiesList = () => readdirSync(resolve(__dirname, "../models/entities")).map(p => basename(p))
