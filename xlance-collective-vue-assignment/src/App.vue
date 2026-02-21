<template>
  <div class="min-h-screen flex flex-col bg-[#101922]">

    <AppNavbar />

    <main class="flex-1 px-6 py-6">
      <router-view />
    </main>

    <AppFooter />

  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>