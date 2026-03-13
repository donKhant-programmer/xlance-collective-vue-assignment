<template>
  <section class="space-y-6 p-8">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black text-primary">Book Directory</h1>

        <p class="mt-2 max-w-xl text-base text-secondary">
          Manage your Book List in the order you would like to show...
        </p>
      </div>

      <AddButton to="/books/add" label="Add Book" />
    </div>

    <!-- SEARCH -->
    <SearchInput
  v-model="search"
  placeholder="Search books by title, author, or category..."
/>

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border border-border">
      <Table class="[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
        <!-- HEADER -->
        <TableHeader class="bg-slate-800">
          <TableRow class="border-b border-slate-800">
            <TableHead class="text-left text-muted"> Title </TableHead>

            <TableHead class="text-left text-muted"> Author </TableHead>

            <TableHead class="text-left text-muted"> Category </TableHead>

            <TableHead class="text-left text-muted"> Status </TableHead>

            <TableHead class="text-right text-muted"> Actions </TableHead>
          </TableRow>
        </TableHeader>

        <!-- BODY -->
        <TableBody>
          <TableRow
            v-for="book in filteredBooks"
            :key="book.id"
            class="border-b border-border last:border-none bg-slate-900"
          >
            <!-- TITLE -->
            <TableCell class="bg-slate-900">
              <div class="flex items-center gap-3">
                <div class="h-14 w-10 rounded overflow-hidden border bg-slate-800 border-slate-700">
                  <img
                    v-if="book.coverImageUrl"
                    :src="book.coverImageUrl"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p class="text-sm text-primary">{{ book.title }}</p>
                  <p class="text-xs text-secondary">Pub. {{ book.year }}</p>
                </div>
              </div>
            </TableCell>

            <!-- AUTHOR -->
            <TableCell class="text-secondary bg-slate-900">{{
              getAuthorName(book.authorId)
            }}</TableCell>

            <!-- CATEGORY -->
            <TableCell class="bg-slate-900">
              <Badge class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-500">
                {{ getCategoryName(book.categoryId) }}
              </Badge>
            </TableCell>

            <!-- STATUS -->
            <TableCell class="bg-slate-900">
              <Badge
                class="px-3 py-1 rounded-full"
                :class="
                  book.status === 'AVAILABLE'
                    ? 'px-3 py-1 rounded-full badge-default badge-green'
                    : 'px-3 py-1 rounded-full badge-default badge-yellow'
                "
              >
                {{ book.status }}
              </Badge>
            </TableCell>

            <!-- ACTIONS -->
            <TableCell class="text-right bg-slate-900">
              <TableActions
  :editLink="`/books/edit/${book.id}`"
  @delete="removeBook(book.id)"
/>
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
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
  import type { Author } from '@/models/author';
  import { AuthorService } from '@/services/AuthorService';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

  import { Badge } from '@/components/ui/badge';
  import TableActions from "@/components/TableActions.vue"
  import SearchInput from '@/components/SearchInput.vue';
  import AddButton from "@/components/AddButton.vue"

  const authors = ref<Author[]>([]);
  const categories = ref<Category[]>([]);
  const books = ref<Book[]>([]);
  const search = ref('');

  function getCategoryName(id: number): string {
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

  const filteredBooks = computed(function (): Book[] {
    return books.value.filter(function (b) {
      return (b.title + getAuthorName(b.authorId) + getCategoryName(b.categoryId))
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  });

  function getAuthorName(id: number): string {
    return (
      authors.value.find(function (a) {
        return a.id === id;
      })?.name || 'Unknown'
    );
  }
</script>
