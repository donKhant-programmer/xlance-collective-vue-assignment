<template>
  <section class="space-y-8 p-8 min-h-screen">
    <!-- Breadcrumb + Back -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-sm font-medium">
        <RouterLink to="/books" class="text-muted"> Books </RouterLink>

        <span class="text-muted">></span>

        <span class="text-primary"> Add New Book </span>
      </div>

      <Button
        as-child
        class="flex items-center gap-2 rounded-lg px-4 py-2 bg-slate-800 text-primary"
      >
        <RouterLink to="/books"> ← Back to List </RouterLink>
      </Button>
    </div>

    <!-- Page Header -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold text-primary">Add New Book</h1>

      <p class="text-sm text-secondary">Fill in the details to expand the library collection.</p>
    </div>

    <!-- FORM CARD -->
    <BookForm v-model="form" :authors="authors" :categories="categories" @submit="handleSubmit" />
  </section>
</template>
<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import BookForm from '@/views/books/BookForm.vue';

  import { BookService } from '@/services/BookService';
  import { CategoryService } from '@/services/CategoryService';
  import { AuthorService } from '@/services/AuthorService';

  import type { Category } from '@/models/category';
  import type { Author } from '@/models/author';

  const form = reactive({
    title: '',
    year: undefined as number | undefined,
    authorId: null as number | null,
    categoryId: null as number | null,
    status: 'AVAILABLE',
    description: '',
    coverImage: null as File | null,
    coverImageUrl: '',
  });

  const authors = ref<Author[]>([]);
  const categories = ref<Category[]>([]);

  const router = useRouter();

  async function loadData(): Promise<void> {
    authors.value = await AuthorService.getAll();
    categories.value = await CategoryService.getAll();
  }

  onMounted(loadData);

  async function handleSubmit(bookData: any): Promise<void> {
    await BookService.add(bookData);
    router.push('/books');
  }
</script>
