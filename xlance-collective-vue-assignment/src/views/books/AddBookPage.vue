<template>
    <section class="space-y-8 p-8 bg-[#101922] min-h-screen">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <RouterLink to="/books" class="text-[#64748B] font-medium text-sm">Books</RouterLink>
          <span class="text-[#64748B] font-medium text-sm">></span>
          <span class="text-[#F1F5F9] font-medium text-sm">Add New Book</span>
        </div>
  
        <RouterLink
          to="/books"
          class="flex items-center gap-2 bg-[#233648] px-4 py-2 rounded-lg text-white font-medium text-sm hover:bg-[#137FEC] transition-colors"
        >
          <span class="text-lg">←</span>
          Back to List
        </RouterLink>
      </div>
  
      <!-- Page Header -->
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-white">Add New Book</h1>
        <p class="text-sm font-normal text-[#92ADC9]">Fill in the details to expand the library collection.</p>
      </div>
  
      <!-- Form -->
      <form class="bg-[#192633] border border-[#192633] rounded-xl p-10 space-y-10" @submit.prevent="submitForm">
        <!-- Book Info -->
        <div class="space-y-6">
          <label class="text-xl font-bold text-white">Book Information</label>
  
          <!-- Row 1 -->
          <div class="flex gap-6">
            <input v-model="form.title" type="text" placeholder="e.g. The Great Gatsby" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white" />
            <input v-model="form.year" type="number" placeholder="e.g. 1925" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white" />
          </div>
  
          <!-- Row 2 -->
          <div class="flex gap-6">
            <select v-model="form.author" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white">
              <option disabled value="">Select an author...</option>
              <option>F. Scott Fitzgerald</option>
              <option>Jane Austen</option>
            </select>
  
            <select v-model="form.category" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white">
              <option disabled value="">Select a category...</option>
              <option>Classic</option>
              <option>Romance</option>
            </select>
          </div>
  
          <!-- Row 3 -->
          <select v-model="form.status" class="bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white">
            <option>AVAILABLE</option>
            <option>BORROWED</option>
          </select>
  
          <!-- Description -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-normal text-[#CBD5E1]">Book Summary</label>
            <textarea v-model="form.description" placeholder="Brief overview..." class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white h-32"></textarea>
          </div>
        </div>
  
        <!-- Buttons -->
        <div class="flex justify-end gap-4">
          <RouterLink to="/books" class="text-[#94A3B8] font-medium text-sm hover:underline">Cancel</RouterLink>
          <button type="submit" class="flex items-center gap-2 bg-[#137FEC] px-8 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors">
            Add to Library
          </button>
        </div>
      </form>
    </section>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { BookService } from '@/services/BookService'
  
  const router = useRouter()
  
  const form = reactive({
    title: '',
    year: null as number | null,
    author: '',
    category: '',
    status: 'AVAILABLE',
    description: ''
  })
  
  const submitForm = async () => {
    if (!form.title || !form.year || !form.author || !form.category) return
  
    await BookService.add({
      id: 0,
      title: form.title,
      year: form.year,
      author: form.author,
      category: form.category,
      status: form.status
    })
  
    router.push('/books')
  }
  </script>