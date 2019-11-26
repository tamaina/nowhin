import * as Nano from "nano"
import { config } from "../config"

export const db = Nano(config.db.url)
