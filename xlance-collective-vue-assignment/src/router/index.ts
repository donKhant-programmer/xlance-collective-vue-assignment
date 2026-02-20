import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import BooksView from '@/views/BooksView.vue'
import AuthorsView from '@/views/AuthorsView.vue'
import CategoriesView from '@/views/CategoriesView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView,
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router