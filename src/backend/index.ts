// tslint:disable: no-var-requires
import * as log from "fancy-log"
import { initDb } from "./db"
import { pkg } from "./pkg"

require("events").EventEmitter.defaultMaxListeners = 128

log(`SVG Telopper v${pkg.version} Server Starting...`)

initDb().then(() => require("./server/index").default())
