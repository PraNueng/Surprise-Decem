import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Birthday from '../components/Birthday.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/birthday', component: Birthday }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router