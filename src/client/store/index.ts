import Vue from "vue"
import Vuex from "vuex"

import { set } from "./mutations"
import me from "./me"
import db from "./db"
import { KeyValue } from "./types"

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

const setData = (es: KeyValue[]) => Object.fromEntries(es.map(e => [e.key, JSON.parse(e.value)]))

db.root.toArray().then(es => store.commit("set", setData(es)))
db.me.toArray().then(es => store.commit("me/set", setData(es)))

export default store
