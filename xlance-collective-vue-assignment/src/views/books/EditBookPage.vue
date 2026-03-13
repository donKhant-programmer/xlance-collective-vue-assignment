<template>
  <section class="space-y-8 p-8 min-h-screen bg-slate-900">
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
    <BookForm
      v-model="form"
      :authors="authors"
      :categories="categories"
      cancel-link="/books"
      @submit="submitForm"
    >
      Update Book
    </BookForm>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { BookService } from '@/services/BookService';
import type { Book, BookStatus } from '@/models/book';
import { AuthorService } from '@/services/AuthorService';
import { CategoryService } from '@/services/CategoryService';
import type { Author } from '@/models/author';
import type { Category } from '@/models/category';
import { Button } from '@/components/ui/button';
import BookForm from '@/views/books/BookForm.vue';

const router = useRouter();
const route = useRoute();

const authors = ref<Author[]>([]);
const categories = ref<Category[]>([]);

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

async function loadData(): Promise<void> {
  const book = await BookService.getById(Number(route.params.id));
  if (book) {
    Object.assign(form, book);
    form.authorId = book.authorId;
    form.categoryId = book.categoryId;
    form.coverImageUrl = book.coverImageUrl || '';
  }

  authors.value = await AuthorService.getAll();
  categories.value = await CategoryService.getAll();
}

onMounted(loadData);

async function submitForm(updatedForm: typeof form) {
  if (!updatedForm.title || !updatedForm.year || !updatedForm.authorId || !updatedForm.categoryId)
    return;

  const updatedBook: Book & { coverImage?: File } = {
    id: updatedForm.id,
    title: updatedForm.title,
    year: updatedForm.year,
    authorId: updatedForm.authorId,
    categoryId: updatedForm.categoryId,
    status: updatedForm.status,
    description: updatedForm.description,
    ...(updatedForm.coverImage instanceof File ? { coverImage: updatedForm.coverImage } : {}),
  };

  await BookService.update(updatedBook);
  router.push('/books');
}
</script>