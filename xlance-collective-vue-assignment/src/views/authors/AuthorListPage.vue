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
        class="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-500 px-5 py-2.5 text-white hover:bg-blue-600"
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
      class="w-full max-w-lg mt-6 rounded-lg bg-slate-800 px-4 py-3 text-sm text-slate-50 border-0 outline-none focus:ring-0 focus:ring-offset-0"
    />

    <!-- TABLE -->
    <div class="overflow-hidden rounded-lg border border-slate-800">
      <!-- HEADER -->
      <div
        class="grid grid-cols-[2fr_1.3fr_1.3fr_140px] bg-slate-900 text-xs text-slate-400 px-6 py-4"
      >
        <span>Author</span>

        <span>Nationality</span>

        <span>Catalog Size</span>

        <span class="text-right">Actions</span>
      </div>

      <!-- ROW -->
      <div
        v-for="author in filteredAuthors"
        :key="author.id"
        class="grid grid-cols-[2fr_1.3fr_1.3fr_140px] items-center border-t border-slate-800 px-6 py-5 gap-6"
      >
        <!-- AUTHOR COLUMN -->
        <div class="flex items-center gap-3">
          <!-- AVATAR -->
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden bg-[#E7F2FD]"
          >
            <img v-if="author.imageUrl" :src="author.imageUrl" class="h-full w-full object-cover" />

            <span v-else class="text-[#137FEC] text-sm font-semibold">
              {{ getInitials(author.name) }}
            </span>
          </div>

          <!-- NAME + GENRE -->
          <div class="flex flex-col">
            <span class="text-sm text-white font-normal">
              {{ author.name }}
            </span>

            <span class="text-xs text-slate-400 font-normal">
              {{ author.genre }}
            </span>
          </div>
        </div>

        <!-- NATIONALITY -->
        <div>
          <span
            class="px-3 py-1 text-xs font-medium text-[#CBD5E1] border border-[#334155] bg-[#1E293B] rounded"
          >
            {{ author.nationality }}
          </span>
        </div>

        <!-- CATALOG SIZE -->
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-white">
            {{ getCatalogSize(author.id) }} Books
          </span>

          <div class="h-[6px] flex-1 bg-[#1E293B] rounded">
            <div
              class="h-[6px] bg-[#137FEC] rounded"
              :style="{ width: getCatalogPercent(getCatalogSize(author.id)) + '%' }"
            />
          </div>
        </div>

        <!-- ACTIONS -->
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
      </div>
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

  const search = ref('');
  const authors = ref<Author[]>([]);
  const books = ref<Book[]>([]);

  onMounted(async function () {
    await loadAuthors();
    books.value = await BookService.getAll();
  });

  async function loadAuthors() {
    authors.value = await AuthorService.getAll();
  }

  async function removeAuthor(id: number) {
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
