<template>
  <section class="min-h-screen bg-[#101922] flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/authors" class="text-[#64748B]">Authors</RouterLink>
          <span class="text-[#64748B]">></span>
          <span class="text-[#F1F5F9]">Add New Author</span>
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
        <h1 class="text-3xl font-bold text-white">Add New Author</h1>
        <p class="text-sm text-[#92ADC9]">Fill in the details to add a new literary contributor.</p>
      </div>

      <!-- FORM -->
      <form
        class="bg-[#192633] border border-[#192633] rounded-xl p-10 space-y-8"
        @submit.prevent="submitForm"
      >
        <!-- AUTHOR PORTRAIT -->
        <div class="space-y-2">
          <label class="text-xl font-bold text-white">Author Portrait</label>

          <div
            @click="triggerFilePicker"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="relative flex items-center justify-center border-2 border-[#324D67] rounded-lg bg-[#101922] h-56 cursor-pointer overflow-hidden"
          >
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <div v-else class="text-center text-[#507A9E] text-xs font-normal">
              Click to upload or drag & drop<br />
              PNG, JPG (MAX. 800x800px)
            </div>

            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/png, image/jpeg"
              @change="handleFileChange"
            />
          </div>
        </div>

        <!-- FULL NAME -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium flex items-center gap-1">
            Full Name
            <span class="text-[#EF4444]">*</span>
          </label>

          <input
            v-model="form.name"
            type="text"
            placeholder="e.g., George Orwell"
            class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
        </div>

        <!-- NATIONALITY -->
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

        <!-- BIOGRAPHY -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium">Biography</label>

          <textarea
            v-model="form.biography"
            placeholder="Write a brief biography of the author..."
            class="w-full h-40 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />

          <p class="text-xs text-[#507A9E]">Recommended length: 100–500 words</p>
        </div>

        <!-- BUTTONS -->
        <div class="flex justify-end items-center gap-4 pt-4">
          <RouterLink to="/authors" class="text-[#94A3B8] text-sm font-medium"> Cancel </RouterLink>

          <button
            type="submit"
            class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
            style="background-color: var(--color-blue)"
          >
            Save Author
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthorService } from '@/services/AuthorService';

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);

const form = reactive({
  name: '',
  nationality: '',
  biography: '',
  image: null as File | null,
  imageUrl: '',
});

function triggerFilePicker() {
  fileInput.value?.click();
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files?.[0]) {
    setFile(target.files[0]);
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.files[0]) {
    setFile(e.dataTransfer.files[0]);
  }
}

function setFile(file: File) {
  if (!file.type.startsWith('image/')) return;

  form.image = file;
  form.imageUrl = URL.createObjectURL(file);
}

async function submitForm() {
  if (!form.name || !form.nationality) return;

  await AuthorService.add({
    id: 0,
    name: form.name,
    nationality: form.nationality,
    biography: form.biography,
    genre: '',
    catalog: 0,
    image: form.image ?? undefined,
  });

  router.push('/authors');
}
</script>