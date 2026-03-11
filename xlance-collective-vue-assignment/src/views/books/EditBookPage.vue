<template>
  <section class="space-y-8 p-8 min-h-screen bg-primary">
    <!-- Breadcrumb + Back -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-sm font-medium">
        <RouterLink to="/books" class="text-muted"> Books </RouterLink>

        <span class="text-muted">></span>

        <span class="text-primary">Edit Book</span>
      </div>

      <Button
        as-child
        class="flex items-center gap-2 rounded-lg px-4 py-2 bg-slate-800 text-primary"
      >
        <RouterLink to="/books"> ← Back to List </RouterLink>
      </Button>
    </div>

    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold text-primary">Edit Book: {{ form.title }}</h1>

      <p class="text-sm text-secondary">Update the book details below.</p>
    </div>

    <!-- FORM CARD -->
    <Card class="mx-auto max-w-4xl p-10 space-y-10 border bg-card border-default">
      <form @submit.prevent="submitForm" class="space-y-10">
        <!-- Cover Image -->
        <div class="flex flex-col gap-3">
          <label class="text-xl font-bold text-primary"> Cover Image </label>

          <div
            @click="triggerFilePicker"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="relative flex items-center justify-center border-2 border-default rounded-lg h-64 cursor-pointer overflow-hidden bg-primary"
          >
            <img
              v-if="form.coverImageUrl"
              :src="form.coverImageUrl"
              class="absolute inset-0 w-full h-full object-cover rounded-lg"
            />

            <div v-else class="flex flex-col items-center text-center gap-2 px-4 text-secondary">
              <img src="/svg/upload-placeholder.svg" class="h-8 w-8" />

              <p class="text-xs">
                Click to upload or drag & drop <br />
                PNG, JPG, or SVG (MAX. 800x800px)
              </p>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
        </div>

        <!-- Book Info -->
        <div class="space-y-6">
          <label class="text-xl font-bold text-primary"> Book Information </label>

          <!-- Row -->
          <div class="flex gap-6 flex-wrap">
            <Input
              v-model="form.title"
              placeholder="e.g. The Great Gatsby"
              class="flex-1 rounded-xl border px-4 py-3 input-bg input-border input-text"
            />

            <Input
              v-model="form.year"
              type="number"
              placeholder="e.g. 1925"
              class="flex-1 rounded-xl border px-4 py-3 input-bg input-border input-text"
            />
          </div>

          <div class="flex gap-6 flex-wrap">
            <!-- Author -->
            <Select v-model="form.authorId">
              <SelectTrigger
                class="flex-1 rounded-xl border px-4 py-3 input-bg input-border input-text"
              >
                <SelectValue placeholder="Select an author..." />
              </SelectTrigger>

              <SelectContent class="rounded-xl border border-default shadow-lg input-bg input-text">
                <SelectItem
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                  class="select-item-hover"
                >
                  {{ author.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <!-- Category -->
            <Select v-model="form.categoryId">
              <SelectTrigger
                class="flex-1 rounded-xl border px-4 py-3 input-bg input-border input-text"
              >
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>

              <SelectContent class="rounded-xl border border-default shadow-lg input-bg input-text">
                <SelectItem
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                  class="select-item-hover"
                >
                  {{ cat.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Status -->
          <Select v-model="form.status">
            <SelectTrigger class="rounded-xl border px-4 py-3 input-bg input-border input-text">
              <SelectValue />
            </SelectTrigger>

            <SelectContent class="rounded-xl border border-default shadow-lg input-bg input-text">
              <SelectItem value="AVAILABLE" class="select-item-hover"> AVAILABLE </SelectItem>

              <SelectItem value="BORROWED" class="select-item-hover"> BORROWED </SelectItem>
            </SelectContent>
          </Select>

          <!-- Description -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-secondary"> Book Summary </label>

            <Textarea
              v-model="form.description"
              placeholder="Brief overview..."
              class="h-32 rounded-xl border px-4 py-3 input-bg input-border input-text"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4">
          <RouterLink to="/books" class="text-sm font-medium hover:underline text-secondary">
            Cancel
          </RouterLink>

          <Button
            type="submit"
            class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-white btn-blue"
          >
            Update Book
            <CircleCheck class="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
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
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Card } from '@/components/ui/card';

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

  const authors = ref<Author[]>([]);

  const categories = ref<Category[]>([]);

  const router = useRouter();
  const route = useRoute();
  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    id: 0,
    title: '',
    year: undefined as number | undefined,
    authorId: null as number | null,
    categoryId: null as number | null,
    status: 'AVAILABLE' as BookStatus,
    description: '',
    coverImage: null as File | null,
    coverImageUrl: '',
  });

  const inputStyle = {
    backgroundColor: 'var(--color-input-bg)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  };

  async function loadData(): Promise<void> {
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

  onMounted(loadData);

  // File picker
  function triggerFilePicker(): void {
    fileInput.value?.click();
  }
  function handleFileChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) setFile(target.files[0]);
  }
  function handleDrop(e: DragEvent): void {
    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  }
  function setFile(file: File): void {
    if (!file.type.startsWith('image/')) return;
    form.coverImage = file;
    form.coverImageUrl = URL.createObjectURL(file);
  }

  // Submit
  async function submitForm(): Promise<void> {
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
  }
</script>
