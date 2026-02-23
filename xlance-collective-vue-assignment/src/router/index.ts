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
      {
        path: 'edit/:id',
        component: () => import('@/views/books/EditBookPage.vue'),
      }
    ],
  },
  {
    path: '/authors',
    component: AuthorsView,
    children: [
      {
        path: '',
        component: () => import('@/views/authors/AuthorListPage.vue'),
      },
      {
        path: 'add',
        component: () => import('@/views/authors/AddAuthorPage.vue'),
      },
      // {
      //   path: 'edit/:id',
      //   component: () => import('@/views/authors/EditAuthorPage.vue'),
      // }
    ]
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