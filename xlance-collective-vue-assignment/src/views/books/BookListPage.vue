<template>
  <section class="space-y-6 p-8 min-h-screen">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black" style="color: var(--color-text-primary)">Book Directory</h1>

        <p class="mt-2 max-w-xl text-base" style="color: var(--color-text-secondary)">
          Manage your Book List in the order you would like to show...
        </p>
      </div>

      <RouterLink
        to="/books/add"
        class="flex items-center gap-2 rounded-xl px-5 py-2.5 text-white transition-opacity hover:opacity-90"
        style="background-color: var(--color-blue)"
      >
        <Plus :size="20" />
        Add Book
      </RouterLink>
    </div>

    <!-- SEARCH -->
    <input
      v-model="search"
      placeholder="Search books by title, author, or category..."
      class="w-full max-w-lg rounded-xl px-4 py-3 text-sm outline-none appearance-none border"
      style="
        background-color: var(--color-slate-800);
        border-color: var(--color-border);
        color: var(--color-text-primary);
      "
    />

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border" style="border-color: var(--color-border)">
      <!-- TABLE HEADER -->
      <div
        class="grid grid-cols-5 px-6 py-4 text-xs rounded-t-xl"
        style="background-color: var(--color-slate-900); color: var(--color-text-muted)"
      >
        <span>Title</span>
        <span>Author</span>
        <span>Category</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      <!-- ROW -->
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="grid grid-cols-5 items-center border-t px-6 py-5 first:border-t-0 hover:bg-[var(--color-slate-800)] transition-colors"
        style="border-color: var(--color-border)"
      >
        <!-- TITLE -->
        <div class="flex items-center gap-3">
          <div class="h-14 w-10 rounded overflow-hidden border border-slate-700 bg-slate-800">
            <img
              v-if="book.coverImageUrl"
              :src="book.coverImageUrl"
              alt="cover"
              class="h-full w-full object-cover"
            />
          </div>

          <div>
            <p class="text-sm" style="color: var(--color-text-primary)">{{ book.title }}</p>
            <p class="text-xs" style="color: var(--color-text-secondary)">Pub. {{ book.year }}</p>
          </div>
        </div>

        <span class="text-sm" style="color: var(--color-text-secondary)">{{
          getAuthorName(book.authorId)
        }}</span>

        <span class="w-fit rounded bg-indigo-200 px-2 py-1 text-xs font-medium text-indigo-500">
          {{ getCategoryName(book.categoryId) }}
        </span>

        <span
          :class="book.status === 'AVAILABLE' ? 'font-bold text-xs' : 'font-bold text-xs'"
          :style="
            book.status === 'AVAILABLE'
              ? 'color: var(--color-green-400)'
              : 'color: var(--color-yellow-400)'
          "
        >
          {{ book.status }}
        </span>

        <div class="flex gap-2" style="color: var(--color-text-muted)">
          <Pencil
            :size="18"
            class="cursor-pointer"
            @click="$router.push(`/books/edit/${book.id}`)"
          />
          <Trash2 :size="18" class="cursor-pointer" @click="removeBook(book.id)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { BookService } from '@/services/BookService';
  import type { Book } from '@/models/book';
  import { Plus, Pencil, Trash2 } from 'lucide-vue-next';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
  import type { Author } from '@/models/author';
  import { AuthorService } from '@/services/AuthorService';

  const authors = ref<Author[]>([]);
  const categories = ref<Category[]>([]);

  const getCategoryName = (id: number) =>
    categories.value.find((c) => c.id === id)?.name || 'Unknown';

  const books = ref<Book[]>([]);
  const search = ref('');

  const loadBooks = async () => {
    books.value = await BookService.getAll();
  };

  const removeBook = async (id: number) => {
    await BookService.delete(id);
    await loadBooks();
  };

  const loadData = async () => {
    books.value = await BookService.getAll();
    categories.value = await CategoryService.getAll();
    authors.value = await AuthorService.getAll();
  };

  onMounted(loadData);

  const filteredBooks = computed(() =>
    books.value.filter((b) =>
      (b.title + getAuthorName(b.authorId) + getCategoryName(b.categoryId))
        .toLowerCase()
        .includes(search.value.toLowerCase()),
    ),
  );

  const getAuthorName = (id: number) => authors.value.find((a) => a.id === id)?.name || 'Unknown';
</script>
