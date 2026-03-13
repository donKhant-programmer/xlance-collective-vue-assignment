<script setup lang="ts">
  import { Pencil, Trash2 } from 'lucide-vue-next';

  defineProps<{
    editLink: string;
  }>();

  const emit = defineEmits(['delete']);
</script>

<template>
  <div class="flex justify-end gap-3 text-slate-400">
    <Button variant="ghost" size="icon" class="hover:text-white">
      <RouterLink :to="editLink">
        <Pencil :size="18" />
      </RouterLink>
    </Button>

    <Button variant="ghost" size="icon" class="hover:text-red-400" @click="emit('delete')">
      <Trash2 :size="18" />
    </Button>
  </div>
</template>
