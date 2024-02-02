import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/HomeView.vue')
    }
  ]
})

export default router
