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
      <p class="text-sm font-normal text-[#92ADC9]">
        Fill in the details to expand the library collection.
      </p>
    </div>

    <!-- Form -->
    <form
      class="bg-[#192633] border border-[#192633] rounded-xl p-6 md:p-10 mx-auto max-w-4xl space-y-10"
      @submit.prevent="submitForm"
    >
      <!-- Cover Image Picker -->
      <div class="flex flex-col gap-2">
        <label class="text-xl font-bold text-white">Cover Image</label>

        <div
          @click="triggerFilePicker"
          @dragover.prevent
          @drop.prevent="handleDrop"
          class="relative flex items-center justify-center gap-2 border-2 border-[#324D67] rounded-lg bg-[#101922] h-64 w-full cursor-pointer overflow-hidden"
        >
          <!-- Show preview if image selected -->
          <img
            v-if="form.coverImageUrl"
            :src="form.coverImageUrl"
            class="absolute inset-0 h-full w-full object-cover rounded-lg"
          />

          <!-- Show upload content only if no image -->
          <div v-else class="flex flex-col items-center justify-center gap-2 text-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#92ADC9]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l8-8 8 8M12 4v12"
              />
            </svg>
            <span class="text-[#92ADC9] text-sm font-normal">Click to upload or drag and drop</span>
            <span class="text-[#507A9E] text-xs font-normal">PNG, JPG (MAX. 800x800px)</span>
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

      <!-- Book Info -->
      <div class="space-y-6">
        <label class="text-xl font-bold text-white">Book Information</label>

        <!-- Row 1 -->
        <div class="flex gap-6">
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. The Great Gatsby"
            class="flex-1 appearance-none bg-[#111A22] border border-[#324D67] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#137FEC]"
          />
          <input
            v-model="form.year"
            type="number"
            placeholder="e.g. 1925"
            class="flex-1 appearance-none bg-[#111A22] border border-[#324D67] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#137FEC]"
          />
        </div>

        <!-- Row 2 -->
        <div class="flex gap-6">
          <select
            v-model="form.authorId"
            class="flex-1 appearance-none bg-[#111A22] border border-[#324D67] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#137FEC]"
          >
            <option disabled :value="null">Select an author...</option>

            <option v-for="author in authors" :key="author.id" :value="author.id">
              {{ author.name }}
            </option>
          </select>

          <select
            v-model="form.categoryId"
            class="flex-1 appearance-none bg-[#111A22] border border-[#324D67] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#137FEC]"
          >
            <option disabled :value="null">Select a category...</option>

            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        s

        <!-- Row 3 -->
<select
  v-model="form.status"
  class="appearance-none w-full bg-[#111A22] border border-[#324D67] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#137FEC] cursor-pointer"
>
  <option>AVAILABLE</option>
  <option>BORROWED</option>
</select>

        <!-- Description -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-normal text-[#CBD5E1]">Book Summary</label>
          <textarea
            v-model="form.description"
            placeholder="Brief overview..."
            class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white h-32"
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-4">
        <RouterLink to="/books" class="text-[#94A3B8] font-medium text-sm hover:underline"
          >Cancel</RouterLink
        >
        <button
          type="submit"
          class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
style="background-color: var(--color-blue)"
        >
          Add to Library
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
  // import { reactive, ref } from 'vue'
  import { RouterLink, useRouter } from 'vue-router';
  import { BookService } from '@/services/BookService';
  import type { BookStatus } from '@/models/book';
  import { onMounted, reactive, ref } from 'vue';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';

  import { AuthorService } from '@/services/AuthorService';
  import type { Author } from '@/models/author';

  const authors = ref<Author[]>([]);

  onMounted(loadData);

  const loadData = async () => {
    categories.value = await CategoryService.getAll();
    authors.value = await AuthorService.getAll();
  }

  const categories = ref<Category[]>([]);

  const router = useRouter();
  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    title: '',
    year: null as number | null,
    authorId: null as number | null,
    categoryId: null as number | null,
    status: 'AVAILABLE' as BookStatus,
    description: '',
    coverImage: null as File | null,
    coverImageUrl: '',
  });

  // Trigger hidden file input
  const triggerFilePicker = () => {
    fileInput.value?.click();
  };

  // Handle file input change
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setFile(target.files[0]);
    }
  };

  // Handle drag & drop
  const handleDrop = (e: DragEvent) => {
    if (e.dataTransfer?.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Set file and preview
  const setFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    form.coverImage = file;
    form.coverImageUrl = URL.createObjectURL(file);
  };

  // Submit form
  const submitForm = async () => {
    if (!form.title || !form.year || !form.authorId || !form.categoryId) return;

    await BookService.add({
      id: 0,
      title: form.title,
      year: form.year,
      authorId: form.authorId,
      categoryId: form.categoryId,
      status: form.status,
      description: form.description,
      ...(form.coverImage ? { coverImage: form.coverImage } : {}),
    });

    router.push('/books');
  };
</script>
