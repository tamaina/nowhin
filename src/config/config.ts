import * as fs from "fs"
import * as yaml from "js-yaml"
import { resolve } from "path"

export interface ISource {
  url: string
  port: number
  db: {
    host: string
    port: number
    db: string
    username: string
    password: string
    disableCache?: boolean
    extra?: any
  }
}

export interface IMixin {
  parsedUrl: URL
}

const yml = fs.readFileSync(resolve(__dirname, "../../.config/default.yaml"), "utf8")

const conf = yaml.safeLoad(yml) as ISource
conf.url = normalizeUrl(conf.url)
const parsedUrl = validateUrl(conf.url)

export const config = () => Object.assign(({
  parsedUrl
} as IMixin), conf)

function tryCreateUrl(url: string) {
  try {
    return new URL(url)
  } catch (e) {
    throw new Error(`url="${url}" is not a valid URL.`)
  }
}

function validateUrl(url: string) {
  const result = tryCreateUrl(url)
  if (result.pathname.replace("/", "").length) throw new Error(`url="${url}" is not a valid URL, has a pathname.`)
  if (!url.includes(result.host)) throw new Error(`url="${url}" is not a valid URL, has an invalid hostname.`)
  return result
}

function normalizeUrl(url: string) {
  return url.endsWith("/") ? url.substr(0, url.length - 1) : url
}
