import { createRouter, createWebHistory } from 'vue-router'
import ImageView from '@/components/ImageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ImageView
    },
  ]
})

export default router
