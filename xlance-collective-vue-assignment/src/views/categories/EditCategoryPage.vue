<template>
  <section class="min-h-screen bg-primary flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium text-muted">
          <RouterLink to="/categories" class="hover:underline">Categories</RouterLink>
          <span class="text-muted">&gt;</span>
          <span class="text-primary">Edit: {{ form.name }}</span>
        </div>

        <RouterLink
          to="/categories"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-primary text-sm hover:bg-blue hover:text-primary transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-primary">Edit Category: {{ form.name }}</h1>

        <p class="text-sm text-secondary">
          Modify the category details and visibility settings for the library catalog.
        </p>
      </div>

      <!-- FORM -->
      <form
        class="p-10 rounded-2xl bg-card border border-border space-y-8"
        @submit.prevent="updateCategory"
      >
        <!-- NAME -->
        <div class="space-y-2">
          <label class="text-sm font-medium flex items-center gap-1 text-primary">
            Category Name
            <span class="text-[var(--color-red)]">*</span>
          </label>

          <Input
            v-model="form.name"
            placeholder="e.g., Science Fiction"
            class="w-full rounded-xl px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70"
          />

          <p class="text-xs text-muted">
            The name as it will appear in the public library catalog.
          </p>
        </div>

        <!-- DESCRIPTION -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-primary">
            Description
            <span class="text-secondary text-xs">(Optional)</span>
          </label>

          <Textarea
            v-model="form.description"
            placeholder="Briefly describe what books belong in this category..."
            class="w-full h-28 rounded-xl px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70"
          />
        </div>

        <!-- ACTIVE STATUS -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-primary text-sm">Active Status</p>

            <p class="text-xs text-muted">
              Enable this to show the category in the discovery browse
            </p>
          </div>

          <!-- SWITCH -->
          <Switch v-model="form.active" />
        </div>

        <!-- BUTTONS -->
        <div class="flex justify-end items-center gap-6 pt-4">
          <RouterLink to="/categories" class="text-sm font-medium text-secondary hover:underline">
            Discard Changes
          </RouterLink>

          <Button
            type="submit"
            class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-primary font-medium hover:opacity-90 bg-blue hover:bg-blue/90"
          >
            Update Category
          </Button>
        </div>
      </form>

      <!-- SYSTEM INFO -->
      <div class="flex justify-center items-center gap-2 text-sm text-secondary mt-6 text-center">
        <span>System Version 2.4.0</span>
        <span class="text-muted">•</span>
        <span>Last updated 12 mins ago</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Button } from '@/components/ui/button';
  import { Switch } from '@/components/ui/switch';

  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);

  const form = ref<Category>({
    id: 0,
    name: '',
    description: '',
    bookCount: 0,
    updatedAt: '',
    active: true,
  });

  async function loadData(): Promise<void> {
    try {
      const id = Number(route.params.id);
      form.value = await CategoryService.getById(id);
    } catch (e) {
      router.push('/categories');
    } finally {
      loading.value = false;
    }
  }

  onMounted(loadData);

  async function updateCategory(): Promise<void> {
    if (!form.value.name) return;

    await CategoryService.update(form.value);

    router.push('/categories');
  }
</script>
