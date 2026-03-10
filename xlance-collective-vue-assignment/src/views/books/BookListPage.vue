<template>
  <section class="space-y-6 p-8">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black text-white">Book Directory</h1>

        <p class="mt-2 max-w-xl text-base text-slate-400">
          Manage your Book List in the order you would like to show...
        </p>
      </div>

      <Button
        as-child
        class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-white"
        style="background-color: var(--color-blue)"
      >
        <RouterLink to="/books/add">
          <Plus :size="20" />
          Add Book
        </RouterLink>
      </Button>
    </div>

    <!-- SEARCH -->
    <Input
      v-model="search"
      placeholder="Search books by title, author, or category..."
      class="w-full max-w-lg rounded-xl border px-4 py-3 text-sm"
      style="
        background-color: var(--color-slate-900);
        border-color: var(--color-border);
        color: var(--color-text-primary);
      "
    />

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border" style="border-color: var(--color-border)">
      <Table class="[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
        <!-- HEADER -->
        <TableHeader style="background-color: var(--color-slate-800)">
          <TableRow class="border-b" style="border-color: var(--color-slate-800)">
            <TableHead class="text-left" style="color: var(--color-text-muted); width: 2fr">
              Title
            </TableHead>

            <TableHead class="text-left" style="color: var(--color-text-muted); width: 1.5fr">
              Author
            </TableHead>

            <TableHead class="text-left" style="color: var(--color-text-muted); width: 1fr">
              Category
            </TableHead>

            <TableHead class="text-left" style="color: var(--color-text-muted); width: 1fr">
              Status
            </TableHead>

            <TableHead class="text-right" style="color: var(--color-text-muted); width: 1.5fr">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <!-- BODY -->
        <TableBody>
          <TableRow
            v-for="book in filteredBooks"
            :key="book.id"
            class="border-b last:border-none bg-[var(--color-slate-900)]"
            :style="{ borderColor: 'var(--color-border)' }"
          >
            <!-- TITLE -->
            <TableCell style="background-color: var(--color-slate-900)">
              <div class="flex items-center gap-3">
                <div
                  class="h-14 w-10 rounded overflow-hidden border"
                  style="
                    background-color: var(--color-slate-800);
                    border-color: var(--color-slate-700);
                  "
                >
                  <img
                    v-if="book.coverImageUrl"
                    :src="book.coverImageUrl"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p class="text-sm" style="color: var(--color-text-primary)">{{ book.title }}</p>
                  <p class="text-xs" style="color: var(--color-text-secondary)">
                    Pub. {{ book.year }}
                  </p>
                </div>
              </div>
            </TableCell>

            <!-- AUTHOR -->
            <TableCell
              style="color: var(--color-text-secondary); background-color: var(--color-slate-900)"
              >{{ getAuthorName(book.authorId) }}</TableCell
            >

            <!-- CATEGORY -->
            <TableCell style="background-color: var(--color-slate-900)">
              <Badge
                class="px-3 py-1 rounded-full"
                style="background-color: var(--color-badge-bg); color: var(--color-indigo-500)"
              >
                {{ getCategoryName(book.categoryId) }}
              </Badge>
            </TableCell>

            <!-- STATUS -->
            <TableCell style="background-color: var(--color-slate-900)">
              <Badge
                class="px-3 py-1 rounded-full"
                :style="
                  book.status === 'AVAILABLE'
                    ? 'background-color: var(--color-badge-bg); color: var(--color-green-400)'
                    : 'background-color: var(--color-badge-bg); color: var(--color-yellow-400)'
                "
              >
                {{ book.status }}
              </Badge>
            </TableCell>

            <!-- ACTIONS -->
            <TableCell class="text-right" style="background-color: var(--color-slate-900)">
              <div class="flex justify-end gap-3 text-slate-400">
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-white"
                  @click="$router.push(`/books/edit/${book.id}`)"
                >
                  <Pencil :size="18" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-red-400"
                  @click="removeBook(book.id)"
                >
                  <Trash2 :size="18" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
  import { RouterLink } from 'vue-router';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

  import { Badge } from '@/components/ui/badge';

  const authors = ref<Author[]>([]);
  const categories = ref<Category[]>([]);
  const books = ref<Book[]>([]);
  const search = ref('');

  function getCategoryName(id: number) {
    return (
      categories.value.find(function (c) {
        return c.id === id;
      })?.name || 'Unknown'
    );
  }

  async function loadBooks(): Promise<void> {
    books.value = await BookService.getAll();
  }

  async function removeBook(id: number): Promise<void> {
    await BookService.delete(id);
    await loadBooks();
  }

  async function loadData(): Promise<void> {
    books.value = await BookService.getAll();
    categories.value = await CategoryService.getAll();
    authors.value = await AuthorService.getAll();
  }

  onMounted(loadData);

  const filteredBooks = computed(function () {
    return books.value.filter(function (b) {
      return (b.title + getAuthorName(b.authorId) + getCategoryName(b.categoryId))
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  });

  function getAuthorName(id: number) {
    return (
      authors.value.find(function (a) {
        return a.id === id;
      })?.name || 'Unknown'
    );
  }
</script>
