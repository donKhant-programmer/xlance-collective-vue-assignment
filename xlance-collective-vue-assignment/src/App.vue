<template>
  <div class="min-h-screen flex flex-col bg-slate-950">

    <AppNavbar />

    <main class="flex-1 px-40 py-0">
      <router-view />
    </main>

    <AppFooter />

  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>