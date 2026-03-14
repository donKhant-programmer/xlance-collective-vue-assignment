<template>
  <div class="min-h-screen flex flex-col bg-page">
    <AppNavbar />

    <main class="flex-1">
      <div class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <router-view />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<script setup lang="ts">
  import AppNavbar from '@/components/layout/AppNavbar.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
</script>
