<template>
  <section class="space-y-6 p-8">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black text-white">Author Directory</h1>
        <p class="mt-2 max-w-xl text-slate-400 text-base">
          Manage your global database of literary contributors. Track their works and metadata from
          a centralized dashboard.
        </p>
      </div>

      <Button
        as-child
        class="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-white transition-colors"
        style="background-color: var(--color-blue)"
      >
        <RouterLink to="/authors/add" class="inline-flex items-center gap-2">
          <Plus :size="20" />
          <span>Add Author</span>
        </RouterLink>
      </Button>
    </div>

    <!-- SEARCH -->
    <Input
      v-model="search"
      placeholder="Filter by name or nationality..."
      class="w-full max-w-lg mt-6 rounded-xl border px-4 py-3 text-sm outline-none appearance-none"
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
          <TableRow class="border-b" style="border-color: var(--color-border)">
            <TableHead class="text-left" style="color: var(--color-text-muted); width: 2fr">
              Author
            </TableHead>

            <TableHead class="text-left" style="color: var(--color-text-muted); width: 1.3fr">
              Nationality
            </TableHead>

            <TableHead class="text-left" style="color: var(--color-text-muted); width: 1.3fr">
              Catalog Size
            </TableHead>

            <TableHead class="text-right" style="color: var(--color-text-muted); width: 140px">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <!-- BODY -->
        <TableBody>
          <TableRow
            v-for="author in filteredAuthors"
            :key="author.id"
            class="border-b last:border-none bg-[var(--color-slate-900)]"
            :style="{ borderColor: 'var(--color-border)' }"
          >
            <!-- AUTHOR COLUMN -->
            <TableCell style="background-color: var(--color-slate-900)">
              <div class="flex items-center gap-3">
                <div
                  class="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden bg-[var(--color-slate-800)]"
                >
                  <img
                    v-if="author.imageUrl"
                    :src="author.imageUrl"
                    class="h-full w-full object-cover"
                  />
                  <span v-else class="text-[var(--color-blue)] text-sm font-semibold">
                    {{ getInitials(author.name) }}
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm text-white font-normal">{{ author.name }}</span>
                  <span class="text-xs text-slate-400 font-normal">{{ author.genre }}</span>
                </div>
              </div>
            </TableCell>

            <!-- NATIONALITY -->
            <TableCell style="background-color: var(--color-slate-900)">
              <Badge
                class="px-3 py-1 rounded-lg"
                style="
                  background-color: var(--color-slate-800);
                  border-color: var(--color-slate-700);
                  color: var(--color-text-secondary);
                "
              >
                {{ author.nationality }}
              </Badge>
            </TableCell>

            <!-- CATALOG SIZE -->
            <TableCell style="background-color: var(--color-slate-900)">
              <div class="flex items-center gap-4">
                <span class="text-sm font-medium text-white"
                  >{{ getCatalogSize(author.id) }} Books</span
                >
                <div class="h-[6px] flex-1 bg-[var(--color-slate-800)] rounded">
                  <div
                    class="h-[6px] bg-[var(--color-blue)] rounded"
                    :style="{ width: getCatalogPercent(getCatalogSize(author.id)) + '%' }"
                  />
                </div>
              </div>
            </TableCell>

            <!-- ACTIONS -->
            <TableCell class="text-right" style="background-color: var(--color-slate-900)">
              <div class="flex justify-end gap-3 text-slate-400">
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-white"
                  @click="$router.push(`/authors/edit/${author.id}`)"
                >
                  <Pencil :size="18" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-red-400"
                  @click="removeAuthor(author.id)"
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
  import { Plus, Pencil, Trash2 } from 'lucide-vue-next';
  import { AuthorService } from '@/services/AuthorService';
  import type { Author } from '@/models/author';
  import type { Book } from '@/models/book';
  import { BookService } from '@/services/BookService';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';

  const search = ref('');
  const authors = ref<Author[]>([]);
  const books = ref<Book[]>([]);

  async function loadData(): Promise<void> {
    await loadAuthors();
    books.value = await BookService.getAll();
  }

  onMounted(loadData);

  async function loadAuthors(): Promise<void> {
    authors.value = await AuthorService.getAll();
  }

  async function removeAuthor(id: number): Promise<void> {
    await AuthorService.delete(id);
    await loadAuthors();
  }

  const filteredAuthors = computed(function () {
    return authors.value.filter(function (a) {
      return (a.name + a.nationality).toLowerCase().includes(search.value.toLowerCase());
    });
  });

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(function (n) {
        return n[0];
      })
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  function getCatalogPercent(size: number) {
    return (size / maxCatalogSize.value) * 100;
  }

  const maxCatalogSize = computed(function () {
    return Math.max(
      ...books.value.map(function (b) {
        return b.authorId ? getCatalogSize(b.authorId) : 0;
      }),
      1,
    );
  });

  function getCatalogSize(authorId: number) {
    return books.value.filter(function (b) {
      return b.authorId === authorId;
    }).length;
  }
</script>
