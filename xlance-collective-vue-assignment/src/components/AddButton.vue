<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Plus } from "lucide-vue-next"
import { Button } from "@/components/ui/button"

defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <Button
  class="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-primary bg-blue-500 hover:bg-blue-600 transition-colors"
>
  <RouterLink :to="to" class="inline-flex items-center gap-2">
    <Plus :size="20" />
    <span>{{ label }}</span>
  </RouterLink>
</Button>
</template>