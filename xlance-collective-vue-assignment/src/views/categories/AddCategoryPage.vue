<template>
  <section class="min-h-screen flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium text-muted">
          <RouterLink to="/categories" class="hover:underline">Categories</RouterLink>
          <span class="text-muted">&gt;</span>
          <span class="text-primary">Add New Category</span>
        </div>

        <RouterLink
          to="/categories"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-primary text-sm hover:bg-blue-600 hover:text-primary transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-primary">Add New Category</h1>
        <p class="text-sm text-secondary">
          Organize your collection by defining a new genre or classification.
        </p>
      </div>

      <!-- REUSABLE FORM COMPONENT -->
      <CategoryForm v-model="form" @submit="handleSubmit">
        <template #cancel>
          <RouterLink to="/categories" class="text-sm font-medium text-secondary hover:underline">
            Cancel
          </RouterLink>
        </template>
      </CategoryForm>

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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { CategoryService } from '@/services/CategoryService';
  import CategoryForm from '@/views/categories/CategoryForm.vue';

  const router = useRouter();

  const form = ref({
    name: '',
    description: '',
  });

  async function handleSubmit(formData: typeof form.value): Promise<void> {
    if (!formData.name) return;

    await CategoryService.create({
      name: formData.name,
      description: formData.description,
      active: true,
    });

    router.push('/categories');
  }
</script>
