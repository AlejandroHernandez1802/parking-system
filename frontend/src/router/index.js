import Vue from 'vue'
import VueRouter from 'vue-router'

//Components imports...
import LoginForm from '../components/LoginForm';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LoginForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
