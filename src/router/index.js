import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import SignIn from "@/components/SignIn";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
