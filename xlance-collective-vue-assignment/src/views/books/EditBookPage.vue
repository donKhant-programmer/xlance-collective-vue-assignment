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
          <!-- Show preview if image selected or existing -->
          <img
            v-if="form.coverImageUrl"
            :src="form.coverImageUrl"
            class="absolute inset-0 h-full w-full object-cover rounded-lg"
          />

          <!-- Show upload content only if no image -->
<div v-else class="flex flex-col items-center justify-center gap-2 text-center px-4">
  <img
    src="/svg/upload-placeholder.svg"
    alt="Upload Placeholder"
    class="h-8 w-8 text-[#92ADC9]"
  />
  <p class="text-xs text-[#507A9E]">
    Click to upload or drag & drop<br />
    PNG, JPG, or SVG (MAX. 800x800px)
  </p>
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
        <div class="flex gap-6 flex-wrap">
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. The Great Gatsby"
            class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
          <input
            v-model="form.year"
            type="number"
            placeholder="e.g. 1925"
            class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
        </div>

        <div class="flex gap-6 flex-wrap">
          <!-- Author -->
          <select
            v-model="form.authorId"
            class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          >
            <option disabled :value="null">Select an author...</option>
            <option v-for="author in authors" :key="author.id" :value="author.id">
              {{ author.name }}
            </option>
          </select>

          <!-- Category -->
          <select
            v-model="form.categoryId"
            class="flex-1 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          >
            <option disabled :value="null">Select a category...</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Row 3 -->
        <select
          v-model="form.status"
          class="bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
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
        <!-- Cancel button -->
        <RouterLink to="/books" class="text-[#94A3B8] font-medium text-sm"> Cancel </RouterLink>

        <!-- Update Book button -->
        <Button
          type="submit"
          class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
style="background-color: var(--color-blue)"
        >
          Update Book
          <CircleCheck class="w-4 h-4 text-[#137FEC]" />
        </Button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useRoute, useRouter, RouterLink } from 'vue-router';
  import { BookService } from '@/services/BookService';
  import type { Book, BookStatus } from '@/models/book';
  import { CircleCheck } from 'lucide-vue-next';
  import { AuthorService } from '@/services/AuthorService';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
  import type { Author } from '@/models/author';

  const authors = ref<Author[]>([]);

  const categories = ref<Category[]>([]);

  const router = useRouter();
  const route = useRoute();
  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    id: 0,
    title: '',
    year: null as number | null,
    authorId: null as number | null,
    categoryId: null as number | null,
    status: 'AVAILABLE' as BookStatus,
    description: '',
    coverImage: null as File | null,
    coverImageUrl: '',
  });

  onMounted(loadData);

  const loadData = async () => {
    const book = await BookService.getById(Number(route.params.id));
    if (book) {
      Object.assign(form, book);

      // Make sure IDs are set, not names
      form.authorId = book.authorId;
      form.categoryId = book.categoryId;
      form.coverImageUrl = book.coverImageUrl || '';
    }

    // Load authors & categories
    authors.value = await AuthorService.getAll();
    categories.value = await CategoryService.getAll();
  }

  // File picker
  const triggerFilePicker = () => {
    fileInput.value?.click();
  };
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) setFile(target.files[0]);
  };
  const handleDrop = (e: DragEvent) => {
    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  };
  const setFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    form.coverImage = file;
    form.coverImageUrl = URL.createObjectURL(file);
  };

  // Submit
  const submitForm = async () => {
    if (!form.title || !form.year || !form.authorId || !form.categoryId) return;

    // Only include coverImage if it's a valid File
    const updatedBook: Book & { coverImage?: File } = {
      id: form.id,
      title: form.title,
      year: form.year,
      authorId: form.authorId,
      categoryId: form.categoryId,
      status: form.status,
      description: form.description,
      ...(form.coverImage instanceof File ? { coverImage: form.coverImage } : {}),
    };

    await BookService.update(updatedBook);
    router.push('/books');
  };
</script>
