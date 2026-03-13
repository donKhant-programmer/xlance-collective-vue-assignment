<template>
  <section class="min-h-screen flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl space-y-8">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/authors" class="text-muted"> Authors </RouterLink>

          <span class="text-muted">></span>

          <span class="text-primary"> Add New Author </span>
        </div>

        <Button
          as-child
          class="flex items-center gap-2 rounded-lg px-4 py-2 bg-slate-800 text-primary"
        >
          <RouterLink to="/authors"> ← Back to List </RouterLink>
        </Button>
      </div>

      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-primary">Add New Author</h1>

        <p class="text-sm text-secondary">Fill in the details to add a new literary contributor.</p>
      </div>

      <!-- FORM CARD -->
      <AuthorForm @submit="handleSubmit" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import AuthorForm from '@/views/authors/AuthorForm.vue';
import { AuthorService } from '@/services/AuthorService';

const router = useRouter();

async function handleSubmit(data: any) {
  await AuthorService.add({ id: 0, ...data, genre: '', catalog: 0 });
  router.push('/authors');
}
</script>