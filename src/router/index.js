import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import Quiz from './../views/Quiz.vue'
import Login from './../views/Login.vue'
import CourseCreation from './../views/CourseCreation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/course-creation',
    name: 'CourseCreation',
    component: CourseCreation
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
