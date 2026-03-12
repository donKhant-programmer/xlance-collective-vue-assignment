<template>
  <section class="min-h-screen bg-slate-900 flex justify-center items-start py-12 px-4">
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
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-primary text-sm hover:bg-blue hover:text-primary transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-primary">Add New Category</h1>
        <p class="text-sm text-secondary">Fill in the details to create a new book category.</p>
      </div>

      <!-- FORM -->
      <form
        class="p-10 rounded-2xl bg-card border border-border space-y-8"
        @submit.prevent="submitForm"
      >
        <!-- CATEGORY NAME -->
        <div class="space-y-2">
          <label class="text-sm font-medium flex items-center gap-1 text-primary">
            Category Name
            <span class="text-[var(--color-red)]">*</span>
          </label>

          <Input
            v-model="form.name"
            placeholder="e.g., Science Fiction"
            class="w-full rounded-xl border px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70"
          />
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

        <!-- TIP BOX -->
        <div class="flex items-start gap-2 rounded-xl p-3 bg-blue/10">
          <img src="/svg/info-circle.svg" class="h-4 w-4 mt-0.5 flex-shrink-0" />

          <div class="flex flex-col gap-1">
            <span class="font-medium text-xs text-blue"> Tip </span>

            <span class="text-xs font-normal text-secondary">
              Good category names are short and descriptive. You can later assign tags to specific
              books within these categories.
            </span>
          </div>
        </div>

        <!-- BUTTONS -->
        <div class="flex justify-end items-center gap-6 pt-4">
          <RouterLink to="/categories" class="text-sm font-medium text-secondary hover:underline">
            Cancel
          </RouterLink>

          <Button
            type="submit"
            class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-primary font-medium hover:opacity-90 bg-blue hover:bg-blue/90"
          >
            Create Category
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { CategoryService } from '@/services/CategoryService';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Button } from '@/components/ui/button';

  const router = useRouter();

  const form = ref({
    name: '',
    description: '',
  });

  async function submitForm(): Promise<void> {
    if (!form.value.name) return;

    await CategoryService.create({
      name: form.value.name,
      description: form.value.description,
      active: true,
    });

    router.push('/categories');
  }
</script>
