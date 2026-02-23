<template>
  <section class="space-y-8 p-8 bg-[#101922] min-h-screen">
    <!-- Breadcrumb + Back -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-8">
        <RouterLink to="/books" class="text-[#64748B] font-medium text-sm">Books</RouterLink>
        <span class="text-[#64748B] font-medium text-sm">></span>
        <span class="text-[#F1F5F9] font-medium text-sm">Edit Book</span>
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
      <h1 class="text-3xl font-bold text-white">Edit Book: {{ form.title }}</h1>
      <p class="text-sm font-normal text-[#92ADC9]">Update the book details below.</p>
    </div>

    <!-- Form -->
    <form class="bg-[#192633] border border-[#192633] rounded-xl p-6 md:p-10 mx-auto max-w-4xl space-y-10" @submit.prevent="submitForm">

      <!-- Cover Image Picker -->
      <div class="flex flex-col gap-2">
        <label class="text-xl font-bold text-white">Cover Image</label>

        <div
          @click="triggerFilePicker"
          @dragover.prevent
          @drop.prevent="handleDrop"
          class="relative flex items-center justify-center gap-2 border-2 border-[#324D67] rounded-lg bg-[#101922] h-64 w-full cursor-pointer overflow-hidden"
        >
          <!-- Show preview if image selected or existing -->
          <img
            v-if="form.coverImageUrl"
            :src="form.coverImageUrl"
            class="absolute inset-0 h-full w-full object-cover rounded-lg"
          />

          <!-- Show upload content only if no image -->
          <div v-else class="flex flex-col items-center justify-center gap-2 text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#92ADC9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l8-8 8 8M12 4v12" />
            </svg>
            <span class="text-[#92ADC9] text-sm font-normal">Click to upload or drag and drop</span>
            <span class="text-[#507A9E] text-xs font-normal">PNG, JPG (MAX. 800x800px)</span>
          </div>

          <input type="file" ref="fileInput" class="hidden" accept="image/png, image/jpeg" @change="handleFileChange" />
        </div>
      </div>

      <!-- Book Info -->
      <div class="space-y-6">
        <label class="text-xl font-bold text-white">Book Information</label>

        <!-- Row 1 -->
        <div class="flex gap-6 flex-wrap">
          <input v-model="form.title" type="text" placeholder="e.g. The Great Gatsby" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white" />
          <input v-model="form.year" type="number" placeholder="e.g. 1925" class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white" />
        </div>

        <!-- Row 2 -->
        <div class="flex gap-6 flex-wrap">
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
      <div class="flex items-center justify-end gap-4">
  <!-- Cancel button -->
  <RouterLink 
    to="/books" 
    class="text-[#94A3B8] font-medium text-sm"
  >
    Cancel
  </RouterLink>

  <!-- Update Book button -->
  <button 
    type="submit" 
    class="flex items-center gap-2 bg-[#137FEC] px-6 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors"
  >
    Update book
    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-white">
  <CircleCheck class="text-[#137FEC] w-4 h-4 bg-white rounded-full" />
</span>
  </button>
</div>

    </form>
  </section>
</template>
  
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { BookService } from '@/services/BookService'
import type { Book, BookStatus } from '@/models/book'
import { CircleCheck } from 'lucide-vue-next';

const router = useRouter()
const route = useRoute()
const fileInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  id: 0,
  title: '',
  year: null as number | null,
  author: '',
  category: '',
  status: 'AVAILABLE' as BookStatus,
  description: '',
  coverImage: null as File | null,
  coverImageUrl: ''
})

onMounted(async () => {
  const book = await BookService.getById(Number(route.params.id))
  if (book) {
    Object.assign(form, book)
    form.coverImageUrl = book.coverImageUrl || '' // existing cover image
  }
})

// File picker
const triggerFilePicker = () => {
  fileInput.value?.click()
}
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) setFile(target.files[0])
}
const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0])
}
const setFile = (file: File) => {
  if (!file.type.startsWith('image/')) return
  form.coverImage = file
  form.coverImageUrl = URL.createObjectURL(file)
}

// Submit
const submitForm = async () => {
  if (!form.title || !form.year || !form.author || !form.category) return

  // Only include coverImage if it's a valid File
  const updatedBook: Book & { coverImage?: File } = {
    id: form.id,
    title: form.title,
    year: form.year,
    author: form.author,
    category: form.category,
    status: form.status,
    description: form.description,
    ...(form.coverImage instanceof File ? { coverImage: form.coverImage } : {})
  }

  await BookService.update(updatedBook)
  router.push('/books')
}
</script>