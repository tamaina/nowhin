import Vue from "vue"
import Vuex from "vuex"

import { set } from "./mutations"
import me from "./me"
import db from "./db"

Vue.use(Vuex)

const store = new Vuex.Store({
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

db.root.toArray().then(es => store.commit("set", Object.fromEntries(es.map(e => [e.key, e.value]))))
db.me.toArray().then(es => store.commit("me/set", Object.fromEntries(es.map(e => [e.key, e.value]))))

export default store
