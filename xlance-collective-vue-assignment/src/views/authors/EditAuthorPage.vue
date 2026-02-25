<template>
  <section class="min-h-screen bg-[#101922] flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">

      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/authors" class="text-[#64748B]">Authors</RouterLink>
          <span class="text-[#64748B]">></span>
          <span class="text-[#F1F5F9]">Edit: {{ form.name }}</span>
        </div>

        <RouterLink
          to="/authors"
          class="flex items-center gap-2 bg-[#233648] px-4 py-2 rounded-lg text-white text-sm hover:bg-[#137FEC] transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-white">Edit Author</h1>
        <p class="text-sm text-[#92ADC9]">
          Update the details of {{ form.name }}.
        </p>
      </div>

      <!-- Edit Header: Image + Name + Button -->
      <div class="bg-[#192633] p-8 rounded-xl flex items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-4">
          <img
            :src="form.imageUrl || '/placeholder.png'"
            alt="Author"
            class="w-20 h-20 rounded-[12px] border border-[#324D67] object-cover"
          />
          <span class="text-white font-bold text-[20px]">
            {{ form.name || 'Author Name' }}
          </span>
        </div>

        <button
          @click="triggerFilePicker"
          class="flex items-center gap-2 bg-[#137FEC] text-white font-medium text-sm px-4 py-2 rounded-[8px] hover:bg-blue-600 transition"
        >
          <!-- Up arrow icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v.01M4 12h16M12 4l0 16" />
          </svg>
          Update Profile Photo
        </button>

        <!-- Hidden file input -->
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/png, image/jpeg"
          @change="handleFileChange"
        />
      </div>

      <!-- FORM -->
      <form
        class="bg-[#192633] border border-[#192633] rounded-xl p-10 space-y-8"
        @submit.prevent="submitForm"
      >

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Row 1: Author Name -->
  <div class="space-y-2">
    <label class="text-sm text-white font-medium flex items-center gap-1">
      Author Name
      <span class="text-[#EF4444]">*</span>
    </label>
    <input
      v-model="form.name"
      type="text"
      placeholder="e.g., Haruki Murakami"
      class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
    />
  </div>

  <!-- Row 1: Nationality -->
  <div class="space-y-2">
    <label class="text-sm text-white font-medium flex items-center gap-1">
      Nationality
      <span class="text-[#EF4444]">*</span>
    </label>
    <select
      v-model="form.nationality"
      class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
    >
      <option disabled value="">Select country</option>
      <option>British</option>
      <option>American</option>
      <option>Japanese</option>
      <option>French</option>
    </select>
  </div>

  <!-- Row 2: Date of Birth -->
  <div class="space-y-2">
    <label class="text-sm text-white font-medium">Date of Birth</label>
    <input
      type="date"
      v-model="form.dob"
      class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
    />
  </div>

  <!-- Row 2: Primary Genre -->
  <div class="space-y-2">
    <label class="text-sm text-white font-medium">Primary Genre</label>
    <input
      type="text"
      v-model="form.genre"
      placeholder="e.g., Magical Realism"
      class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
    />
  </div>
</div>

        <!-- BIOGRAPHY -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium">Biography</label>
          <textarea
            v-model="form.bio"
            placeholder="Write a brief biography of the author..."
            class="w-full h-40 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
          <p class="text-xs text-[#507A9E]">
            Recommended length: 100–500 words
          </p>
        </div>

        <!-- BUTTONS -->
        <div class="flex items-center justify-end gap-4 pt-4">
          <RouterLink to="/authors" class="text-[#94A3B8] text-sm font-medium">
            Cancel
          </RouterLink>

          <button
            type="submit"
            class="bg-[#137FEC] px-8 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>

      </form>

    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthorService } from '@/services/AuthorService'
import type { Author } from '@/models/author'

const author = ref<Author | null>(null)

const router = useRouter()
const route = useRoute()
const fileInput = ref<HTMLInputElement | null>(null)

const form = reactive({
  id: 0,
  name: '',
  nationality: '',
  dob: '',
  genre: '',
  bio: '',
  image: null as File | null,
  imageUrl: ''
})

const triggerFilePicker = () => fileInput.value?.click()

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) setFile(target.files[0])
}

const handleDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0])
}

const setFile = (file: File) => {
  if (!file.type.startsWith('image/')) return
  form.image = file
  form.imageUrl = URL.createObjectURL(file)
}

onMounted(async () => {
  const id = Number(route.params.id)
  const data = await AuthorService.getById(id)

  if (!data) return router.push('/authors')

  author.value = data

  form.id = data.id
  form.name = data.name
  form.nationality = data.nationality
  form.dob = data.dob || ''
  form.genre = data.genre || ''
  form.bio = data.biography || ''
  form.imageUrl = data.imageUrl || ''
})

const submitForm = async () => {
  if (!form.name || !form.nationality) return

  await AuthorService.update({
  id: form.id,
  name: form.name,
  nationality: form.nationality,
  genre: form.genre,
  dob: form.dob,
  biography: form.bio,
  image: form.image ?? undefined
})

  router.push('/authors')
}
</script>