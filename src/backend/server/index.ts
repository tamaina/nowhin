import * as colors from "colors"
import * as log from "fancy-log"
import { createServer } from "http"

import config from "../../config"
import App from "./app"

export default async () => {
  const app = await App()
  const httpServer = createServer(app.callback())

  httpServer.listen(config.port)
  log(`サーバーを開始しました。${colors.green(config.url)}`)
}
