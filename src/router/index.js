import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Quizz from '../views/Quizz'
import Result from '../views/Result'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: Quizz
  },
  {
    path: '/result/:score',
    name: 'result',
    component: Result
  }
]

const router = new VueRouter({
  routes
})

export default router
