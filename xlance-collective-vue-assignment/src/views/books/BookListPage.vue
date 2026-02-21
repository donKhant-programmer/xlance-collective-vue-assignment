<template>
    <section class="space-y-6 p-8">
  
      <!-- HEADER -->
      <div class="flex items-start justify-between">
  
        <div>
          <h1 class="text-4xl font-black text-white">
            Book Directory
          </h1>
  
          <p class="mt-2 max-w-xl text-slate-400 text-base">
            Manage your Book List in the order you would like to show...
          </p>
        </div>
  
        <RouterLink
          to="/books/add"
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-white"
        >
          <Plus :size="20" />
          Add Book
        </RouterLink>
  
      </div>
  
      <!-- SEARCH -->
      <input
        v-model="search"
        placeholder="Search books by title, author, or category..."
        class="w-full max-w-lg rounded-lg bg-slate-800 px-4 py-3 text-sm text-slate-50 outline-none"
      />
  
      <!-- TABLE -->
      <div class="overflow-hidden rounded-lg border border-slate-800">
  
        <!-- TABLE HEADER -->
        <div class="grid grid-cols-5 bg-slate-900 text-xs text-slate-400 px-6 py-4">
          <span>Title</span>
          <span>Author</span>
          <span>Category</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
  
        <!-- ROW -->
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="grid grid-cols-5 items-center border-t border-slate-800 px-6 py-5"
        >
  
          <!-- TITLE -->
          <div class="flex items-center gap-3">
            <div class="h-14 w-10 rounded bg-slate-800 border border-slate-700" />
  
            <div>
              <p class="text-slate-100 text-sm">{{ book.title }}</p>
              <p class="text-slate-500 text-xs">Pub. {{ book.year }}</p>
            </div>
          </div>
  
          <span class="text-slate-300 text-sm">{{ book.author }}</span>
  
          <span class="w-fit rounded bg-indigo-200 px-2 py-1 text-xs font-medium text-indigo-500">
            {{ book.category }}
          </span>
  
          <span
            :class="book.status === 'AVAILABLE'
              ? 'text-green-400 font-bold text-xs'
              : 'text-yellow-400 font-bold text-xs'"
          >
            {{ book.status }}
          </span>
  
          <div class="flex gap-2 text-slate-400">
            <Pencil :size="18" class="cursor-pointer" />
            <Trash2 :size="18" class="cursor-pointer" />
          </div>
  
        </div>
      </div>
  
    </section>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { BookService } from '@/services/BookService'
  import type { Book } from '@/models/book'
  import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
  
  const books = ref<Book[]>([])
  const search = ref('')
  
  onMounted(async () => {
    books.value = await BookService.getAll()
  })
  
  const filteredBooks = computed(() =>
    books.value.filter(b =>
      (b.title + b.author + b.category)
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
  )
  </script>