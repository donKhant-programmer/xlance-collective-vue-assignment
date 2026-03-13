<template>
  <section class="space-y-6 p-8">
    <!-- HEADER -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-4xl font-black text-primary">Categories</h1>
        <p class="mt-2 max-w-xl text-secondary text-base">Organize and classify your collection.</p>
      </div>

      <AddButton to="/categories/add" label="Add category" />
    </div>

    <!-- SEARCH -->
    <SearchInput
  v-model="search"
  placeholder="Search categories by name or description..."
/>

    <!-- TABLE -->
    <div class="overflow-hidden rounded-xl border border-border">
      <Table class="[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
        <!-- HEADER -->
        <TableHeader class="bg-slate-800">
          <TableRow class="border-b border-border">
            <TableHead class="text-muted">Category Name</TableHead>
            <TableHead class="text-muted">Description</TableHead>
            <TableHead class="text-muted">Book Count</TableHead>
            <TableHead class="text-muted">Last Updated</TableHead>
            <TableHead class="text-muted">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <!-- BODY -->
        <TableBody>
          <TableRow
            v-for="category in filteredCategories"
            :key="category.id"
            class="border-b last:border-none bg-slate-900 border-border"
          >
            <!-- CATEGORY NAME -->
            <TableCell class="bg-slate-900">
              <div class="flex items-center gap-3">
                <img v-if="category.iconUrl" :src="category.iconUrl" class="h-5 w-5" />
                <span class="text-sm text-primary">{{ category.name }}</span>
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
              <div class="flex justify-end gap-3 text-secondary">
                <Button
                  variant="ghost"
                  size="icon"
                  class="hover:bg-transparent hover:text-primary"
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
  import { Pencil, Trash2 } from 'lucide-vue-next';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
  import { Button } from '@/components/ui/button';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';
  import AddButton from "@/components/AddButton.vue"

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
