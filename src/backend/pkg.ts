import { readFileSync } from "fs"
import { resolve } from "path"

export const pkg = JSON.parse(readFileSync(resolve(__dirname, "../../package.json"), "utf8"))
