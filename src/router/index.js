import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import Quiz from './../views/Quiz.vue'
import Login from './../views/Login.vue'
import CourseCreation from './../views/CourseCreation.vue'
import Courses from './../views/Courses.vue'
import UserCreation from '../views/UserCreation.vue'
import Users from '../views/Users.vue'
import {LEVEL} from '../utils/level'
import userService from '../services/userService'
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
    component: CourseCreation,
    meta: { authorize: [LEVEL.ADMIN] }
  },
  {
    path:'/course-update/:id',
    name:'CourseUpdate',
    component:CourseCreation,
    meta: { authorize: [LEVEL.ADMIN] }
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
    component: Login,
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses,
    meta: { authorize: [LEVEL.ADMIN] }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { authorize: [LEVEL.ADMIN] }
  },
  {
    path: '/user-creation',
    name: 'UserCreation',
    component: UserCreation,
    meta: { authorize: [LEVEL.ADMIN] }
  },
  {
    path: '/user-update',
    name: 'UserUpdate',
    component: UserCreation,
    meta: { authorize: [LEVEL.ADMIN] }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const currentUser = userService.getCurrentUser()

  if (authorize) {
      if (!currentUser) {
          userService.logout()
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      if (authorize.length && !authorize.includes(currentUser.level)) {
          userService.logout()
          return next({ path: '/' });
      }
  }
  next();
})

export default router
