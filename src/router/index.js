import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import Quiz from './../views/Quiz.vue'
import Login from './../views/Login.vue'
import CourseCreation from './../views/CourseCreation.vue'
import Courses from './../views/Courses.vue'
import UserCreation from '../views/UserCreation.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/course-creation',
    name: 'CourseCreation',
    component: CourseCreation
  },
  {
    path:'/course-update/:id',
    name:'CourseUpdate',
    component:CourseCreation
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: '',
    component: Login
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user-creation',
    name: 'UserCreation',
    component: UserCreation
  },
  {
    path: '/user-update',
    name: 'UserUpdate',
    component: UserCreation
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
