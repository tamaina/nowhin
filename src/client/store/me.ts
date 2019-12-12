import { StoreOptions } from "vuex"
import { set } from "./mutations"

export interface IMe {
  id: string
  i: string
  name: string
}

const state = {
  id: null,
  i: null,
  name: null
} as IMe

export default {
  namespaced: true,
  state,
  mutations: {
    set: set("me")
  },
  actions: {
  },
  modules: {
  }
} as StoreOptions<IMe>
