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
        class="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-white bg-blue"
      >
        <RouterLink to="/categories/add" class="inline-flex items-center gap-2">
          <Plus :size="20" />
          <span>Add Category</span>
        </RouterLink>
      </Button>
    </div>

    <!-- SEARCH -->
    <Input
      v-model="search"
      placeholder="Search categories by name or description..."
      class="w-full max-w-lg mt-6 rounded-xl border px-4 py-3 text-sm bg-slate-900 border-default text-primary"
    />

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border border-default">
      <Table class="[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
        <!-- HEADER -->
        <TableHeader class="bg-slate-800">
          <TableRow class="border-b border-default">
            <TableHead class="text-muted th-category-name">Category Name</TableHead>
            <TableHead class="text-muted th-description">Description</TableHead>
            <TableHead class="text-muted th-count">Book Count</TableHead>
            <TableHead class="text-muted th-updated">Last Updated</TableHead>
            <TableHead class="text-muted th-actions">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <!-- BODY -->
        <TableBody>
          <TableRow
            v-for="category in filteredCategories"
            :key="category.id"
            class="border-b last:border-none bg-slate-900 border-default"
          >
            <!-- CATEGORY NAME -->
            <TableCell class="bg-slate-900">
              <div class="flex items-center gap-3">
                <img v-if="category.iconUrl" :src="category.iconUrl" class="h-5 w-5" />
                <span class="text-sm text-white">{{ category.name }}</span>
              </div>
            </TableCell>

            <!-- DESCRIPTION -->
            <TableCell class="bg-slate-900">
              <span class="text-sm text-secondary">{{ category.description }}</span>
            </TableCell>

            <!-- BOOK COUNT -->
            <TableCell class="bg-slate-900">
              <Badge class="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-500">
                {{ category.bookCount }} Books
              </Badge>
            </TableCell>

            <!-- LAST UPDATED -->
            <TableCell class="bg-slate-900">
              <span class="text-sm text-secondary">
                {{ timeAgo(category.updatedAt ?? new Date().toISOString()) }}
              </span>
            </TableCell>

            <!-- ACTIONS -->
            <TableCell class="text-right bg-slate-900">
              <div class="flex justify-end gap-3 text-slate-400">
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-white"
                  @click="$router.push(`/categories/edit/${category.id}`)"
                >
                  <Pencil :size="18" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-red-400"
                  @click="removeCategory(category.id)"
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
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
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

  const search = ref('');
  const categories = ref<Category[]>([]);

  async function loadData(): Promise<void> {
    categories.value = await CategoryService.getAll();
  }

  async function removeCategory(id: number): Promise<void> {
    await CategoryService.delete(id);
    await loadData();
  }

  onMounted(loadData);

  const filteredCategories = computed(function (): Category[] {
    return categories.value.filter(function (c) {
      return (c.name + c.description).toLowerCase().includes(search.value.toLowerCase());
    });
  });

  // utils/time.ts
  function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const diff = (Date.now() - date.getTime()) / 1000; // seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  }
</script>
