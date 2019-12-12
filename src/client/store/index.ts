import Vue from "vue"
import Vuex from "vuex"

import { set } from "./mutations"
import me from "./me"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    set: set("root")
  },
  actions: {
  },
  modules: {
    me
  }
})
