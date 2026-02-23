<template>
    <section class="space-y-6 p-8">
  
      <!-- HEADER -->
      <div class="flex items-start justify-between">
  
        <div>
          <h1 class="text-4xl font-black text-white">
            Author Directory
          </h1>
  
          <p class="mt-2 max-w-xl text-slate-400 text-base">
            Manage your global database of literary contributors.
            Track their works and metadata from a centralized dashboard.
          </p>
        </div>
  
        <RouterLink
          to="/authors/add"
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-white"
        >
          <Plus :size="20" />
          Add Author
        </RouterLink>
  
      </div>
  
      <!-- SEARCH -->
      <input
        v-model="search"
        placeholder="Filter by name or nationality..."
        class="w-full max-w-lg rounded-lg bg-slate-800 px-4 py-3 text-sm text-slate-50 outline-none"
      />
  
      <!-- TABLE -->
      <div class="overflow-hidden rounded-lg border border-slate-800">
  
        <!-- HEADER -->
        <div class="grid grid-cols-[2fr_1fr_1.3fr_auto] bg-slate-900 text-xs text-slate-400 px-6 py-4">
  <span>Author</span>

  <span>Nationality</span>

  <span>Catalog Size</span>

  <span class="text-right">Actions</span>
</div>
  
        <!-- ROW -->
        <div
  v-for="author in filteredAuthors"
  :key="author.id"
  class="grid grid-cols-[2fr_1fr_1.3fr_auto] items-center border-t border-slate-800 px-6 py-5 gap-6"
>
  
          <!-- AUTHOR COLUMN -->
          <div class="flex items-center gap-3">
  
            <!-- AVATAR -->
            <div
              class="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden bg-[#E7F2FD]"
            >
              <img
                v-if="author.imageUrl"
                :src="author.imageUrl"
                class="h-full w-full object-cover"
              />
  
              <span
                v-else
                class="text-[#137FEC] text-sm font-semibold"
              >
                {{ getInitials(author.name) }}
              </span>
            </div>
  
            <!-- NAME + GENRE -->
            <div class="flex flex-col">
              <span class="text-sm text-white font-normal">
                {{ author.name }}
              </span>
  
              <span class="text-xs text-slate-400 font-normal">
                {{ author.genre }}
              </span>
            </div>
  
          </div>
  
          <!-- NATIONALITY -->
          <div>
            <span class="px-3 py-1 text-xs font-medium text-[#CBD5E1] border border-[#334155] bg-[#1E293B] rounded">
              {{ author.nationality }}
            </span>
          </div>
  
          <!-- CATALOG SIZE -->
          <div class="space-y-2">
  
            <span class="text-sm font-medium text-white">
              {{ author.catalog }} Books
            </span>
  
            <div class="h-[6px] w-full bg-[#1E293B] rounded">
              <div
                class="h-[6px] bg-[#137FEC] rounded"
                :style="{ width: getCatalogPercent(author.catalog) + '%' }"
              />
            </div>
  
          </div>
  
          <!-- ACTIONS -->
          <div class="flex justify-end gap-3 text-slate-400">
            <Pencil
              :size="18"
              class="cursor-pointer"
              @click="$router.push(`/authors/edit/${author.id}`)"
            />
            <Trash2
              :size="18"
              class="cursor-pointer"
              @click="removeAuthor(author.id)"
            />
          </div>
  
        </div>
  
      </div>
    </section>
  </template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import { AuthorService } from '@/services/AuthorService'
import type { Author } from '@/models/author'

const search = ref('')
const authors = ref<Author[]>([])

const loadAuthors = async () => {
  authors.value = await AuthorService.getAll()
}

const removeAuthor = async (id: number) => {
  await AuthorService.delete(id)
  await loadAuthors()
}

onMounted(loadAuthors)

const filteredAuthors = computed(() =>
  authors.value.filter(a =>
    (a.name + a.nationality)
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
)

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const getCatalogPercent = (size: number) =>
  Math.min(size * 10, 100)
</script>