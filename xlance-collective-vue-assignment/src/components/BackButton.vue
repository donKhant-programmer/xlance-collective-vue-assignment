<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Button } from '@/components/ui/button';

  defineProps<{
    to: string;
    label?: string;
  }>();
</script>

<template>
  <Button as-child class="flex items-center gap-2 rounded-lg px-4 py-2 bg-slate-800 text-primary">
    <RouterLink :to="to"> ← {{ label || 'Back to List' }} </RouterLink>
  </Button>
</template>
