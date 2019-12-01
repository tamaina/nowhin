import * as pug from "js-koa-pug"
import * as Koa from "koa"
import * as logger from "koa-logger"
import * as mount from "koa-mount"
import * as graphql from "koa-graphql"
import * as locales from "../../../../locales"
import * as salt from "../../../../lib/salt"
import config from "../../../config"
import { pkg } from "../../pkg"
import router from "./router"
import { schema } from "../../operation/schema"
import { resolve } from "path"

export default async () => {
  const app = new Koa()

  const langs = JSON.stringify(Object.keys(locales))
  
  app.use(pug(resolve(__dirname, "views"), {
    basedir: process.cwd(),
    config,
    env: process.env.NODE_ENV,
    langs,
    pkg,
    require,
    salt: process.env.NODE_ENV !== "production" ? salt() : ""
  }))
  app.use(logger())
  app.use(mount("/api", graphql({
    schema: await schema(),
    graphiql: true
  })))
  app.use(router.routes())
  app.use(router.allowedMethods())
  
  return app
}
