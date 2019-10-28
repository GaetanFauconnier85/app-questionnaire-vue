import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Quizz from '../views/Quizz'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/quizz/:idUser',
    name: 'quizz',
    component: Quizz
  }
]

const router = new VueRouter({
  routes
})

export default router
