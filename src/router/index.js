import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import SignIn from "@/components/SignIn";
import SongsHome from "@/components/SongsHome";
import Menu from "@/components/Menu";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  } ,
  {
    path:'/songs-home',
    name: 'SongsHome',
    component: SongsHome
  },
  {
    path:'/menu',
    name: 'Menu',
    component: Menu
  }
]

const router = new VueRouter({
  routes
})

export default router
