import * as colors from "colors"
import * as log from "fancy-log"
import { createServer, Server } from "http"

import config from "../../config"
import app from "./app"
import { pkg } from "./pkg"

export class STServer {
  public httpServer: Server = null

  constructor() {
    log(`SVG Telopper v${pkg.version} Server Starting...`)

    this.httpServer = createServer(app.callback())

    this.httpServer.listen(config.port)
    log(`サーバーを開始しました。${colors.green(config.url)}`)

  }
}

export const server = new Server()
