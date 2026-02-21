import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import BooksView from '@/views/BooksView.vue'
import AuthorsView from '@/views/AuthorsView.vue'
import CategoriesView from '@/views/CategoriesView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/books',
    component: BooksView,
    children: [
      {
        path: '',
        component: () => import('@/views/books/BookListPage.vue'),
      },
      {
        path: 'add',
        component: () => import('@/views/books/AddBookPage.vue'),
      },
    ],
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