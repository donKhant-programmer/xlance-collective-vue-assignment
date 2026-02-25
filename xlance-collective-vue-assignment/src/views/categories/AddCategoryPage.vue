<template>
  <section class="min-h-screen bg-[#101922] flex justify-center items-start py-12 px-4">

    <div class="w-full max-w-3xl">

      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/categories" class="text-[#64748B]">Categories</RouterLink>
          <span class="text-[#64748B]">></span>
          <span class="text-[#F1F5F9]">Add New Category</span>
        </div>

        <RouterLink
          to="/categories"
          class="flex items-center gap-2 bg-[#233648] px-4 py-2 rounded-lg text-white text-sm hover:bg-[#137FEC] transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-white">Add New Category</h1>
        <p class="text-sm text-[#92ADC9]">
          Fill in the details to create a new book category.
        </p>
      </div>

      <!-- FORM -->
      <form
        class="bg-[#192633] border border-[#192633] rounded-xl p-10 space-y-8"
        @submit.prevent="submitForm"
      >
        <!-- CATEGORY NAME -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium flex items-center gap-1">
            Category Name
            <span class="text-[#EF4444]">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g., Science Fiction"
            class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
        </div>

        <!-- DESCRIPTION -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium">Description <span class="text-[#94A3B8] text-xs">(Optional)</span></label>
          <textarea
            v-model="form.description"
            placeholder="Briefly describe what books belong in this category..."
            class="w-full h-28 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
        </div>

        <!-- TIP BOX -->
        <div class="flex items-start gap-2 bg-[#137FEC]/10 rounded-lg p-3">
          <!-- Info icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#137FEC] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
          </svg>
          <div class="flex flex-col gap-1">
            <span class="text-[#137FEC] font-medium text-xs">Tip</span>
            <span class="text-[#CBD5E1] text-xs font-normal">
              Good category names are short and descriptive. You can later assign tags to specific books within these categories.
            </span>
          </div>
        </div>

        <!-- BUTTONS -->
        <div class="flex justify-end items-center gap-6 pt-4">
  <RouterLink
    to="/categories"
    class="text-[#94A3B8] text-sm font-medium"
  >
    Cancel
  </RouterLink>

  <button
    type="submit"
    class="bg-[#137FEC] px-6 py-2 rounded-lg text-white font-medium hover:bg-blue-600 transition"
  >
    Create Category
  </button>
</div>
      </form>

      <!-- SYSTEM INFO -->
      <div class="flex justify-center items-center gap-2 text-sm text-[#94A3B8] mt-6 text-center">
  <span>System Version 2.4.0</span>
  <span class="text-[#64748B]">•</span>
  <span>Last updated 12 mins ago</span>
</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CategoryService } from '@/services/CategoryService'

const router = useRouter()

const form = ref({
  name: '',
  description: '',
})

const submitForm = async () => {
  if (!form.value.name) return

  await CategoryService.create({
  name: form.value.name,
  description: form.value.description,
  active: true,
})

  router.push('/categories')
}
</script>