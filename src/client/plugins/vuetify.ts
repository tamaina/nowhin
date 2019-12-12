import Vue from "vue"
import Vuetify from "vuetify/lib"
import { mdiMenu } from "@mdi/js"


Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
    values: {
      menu: mdiMenu
    }
  }
}) as any
