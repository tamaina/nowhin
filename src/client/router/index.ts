import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/",
      name: "home",
      component: () => import("../views/home.vue") },
    { path: "/signin",
      name: "signin",
      component: () => import("../views/signin.vue") }
  ]
})

export default router
