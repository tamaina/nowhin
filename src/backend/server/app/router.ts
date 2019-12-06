import * as Router from "koa-router"
import * as bodyParser from 'koa-bodyparser'
import * as send from "koa-send"
import { resolve } from "path"

const router = new Router()

router.get("/assets*", async (ctx, next) => {
  await send(ctx as any, ctx.path.slice(7), {
    root: resolve(__dirname, "../../../../built/client")
  })
})

router.get("/files*", async (ctx, next) => {
  await send(ctx as any, ctx.path.slice(7), {
    root: resolve(__dirname, "../../../files")
  })
})

router.get("*", async (ctx: any, next) => {
  ctx.render("base")
})

export default router
