import Vue from 'vue'
import VueRouter from 'vue-router'

//Components imports...
import LoginForm from '../components/LoginForm';
import ParkingRecords from '../components/ParkingRecords';
import CreateRecord from '../components/CreateRecord';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: LoginForm
  },
  {
    path:'/records',
    component: ParkingRecords
  },
  {
    path: '/createRecord',
    component: CreateRecord
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
