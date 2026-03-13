<script setup lang="ts">
  import { Input } from '@/components/ui/input';

  const model = defineModel<string>();

  defineProps<{
    placeholder?: string;
  }>();
</script>

<template>
  <Input
    v-model="model"
    :placeholder="placeholder || 'Search...'"
    class="w-full max-w-lg rounded-xl border px-4 py-3 text-sm bg-form-search border-border text-primary"
  />
</template>
