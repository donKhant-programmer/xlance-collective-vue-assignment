<template>
  <section class="space-y-6 p-8">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black text-white">Categories</h1>

        <p class="mt-2 max-w-xl text-slate-400 text-base">Organize and classify your collection.</p>
      </div>

      <Button
        as-child
        class="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-500 px-5 py-2.5 text-white hover:bg-blue-600"
      >
        <RouterLink to="/categories/add" class="inline-flex items-center gap-2">
          <Plus :size="20" />
          <span>Add Category</span>
        </RouterLink>
      </Button>
    </div>

    <Input
      v-model="search"
      placeholder="Search categories by name or description..."
      class="block w-full max-w-lg rounded-lg bg-slate-800 px-4 py-3 text-sm text-slate-50 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
    />

    <!-- TABLE -->
    <div class="overflow-hidden rounded-lg border border-slate-800">
      <!-- TABLE HEADER -->
      <div
        class="grid grid-cols-[1.5fr_3fr_0.8fr_1fr_120px] bg-slate-900 text-xs text-slate-400 px-6 py-4"
      >
        <span>Category Name</span>
        <span>Description</span>
        <span>Book Count</span>
        <span>Last Updated</span>
        <span>Actions</span>
      </div>

      <!-- ROWS -->
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="grid grid-cols-[1.5fr_3fr_0.8fr_1fr_120px] items-center border-t border-slate-800 px-6 py-5"
      >
        <!-- NAME -->
        <div class="flex items-center gap-3">
          <component v-if="category.iconUrl" :is="category.iconUrl" class="h-5 w-5 text-blue-400" />

          <span class="text-slate-100 text-sm">
            {{ category.name }}
          </span>
        </div>

        <!-- DESCRIPTION -->
        <span class="text-slate-300 text-sm">
          {{ category.description }}
        </span>

        <!-- BOOK COUNT BADGE -->
        <span class="w-fit rounded bg-indigo-200 px-2 py-1 text-xs font-medium text-indigo-500">
          {{ category.bookCount }} Books
        </span>

        <!-- LAST UPDATED -->
        <span class="text-slate-400 text-sm">
          {{ timeAgo(category.updatedAt ?? new Date().toISOString()) }}
        </span>

        <!-- ACTIONS -->
        <div class="flex gap-2 text-slate-400">
          <Pencil
            :size="18"
            class="cursor-pointer"
            @click="$router.push(`/categories/edit/${category.id}`)"
          />
          <Trash2 :size="18" class="cursor-pointer" @click="removeCategory(category.id)" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { Plus, Pencil, Trash2 } from 'lucide-vue-next';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';

  const search = ref('');
  const categories = ref<Category[]>([]);

  const loadData = async () => {
    categories.value = await CategoryService.getAll();
  };

  const removeCategory = async (id: number) => {
    await CategoryService.delete(id);
    await loadCategories();
  };

  onMounted(loadData);

  const filteredCategories = computed(() =>
    categories.value.filter((c) =>
      (c.name + c.description).toLowerCase().includes(search.value.toLowerCase()),
    ),
  );

  // utils/time.ts
  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = (Date.now() - date.getTime()) / 1000; // seconds
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };
</script>
