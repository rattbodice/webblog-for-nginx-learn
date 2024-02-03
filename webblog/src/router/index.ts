import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
    },
    {
      path:'/mypost',
      name: 'mypost',
      component: () => import('../components/MyPostViewer.vue')
    },
    {
      path:'/mypost/edit/:postId',
      name: 'mypost-edit',
      component: () => import('../components/Post/EditBlog.vue')
    }
  ]
})


export default router
