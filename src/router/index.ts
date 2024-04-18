// routes-doc-index.ts

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    components: { default: () => import('../views/HomeView.vue') },
   },
  {
    path: '/favorites',
    name: 'favorites',
    components: { default: () => import('../views/FavoritesView.vue') },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'home' },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
