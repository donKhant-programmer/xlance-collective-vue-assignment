<template>
  <header class="bg-slate-900 border-b border-slate-800">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      <!-- LEFT -->
      <div class="flex items-center gap-8 w-3/5">

        <RouterLink to="/" class="flex items-center gap-2">

          <Library class="text-blue-500" :size="22" />

          <span class="text-white font-bold text-lg">
            Library Manage
          </span>

        </RouterLink>

        <ul class="flex items-center gap-6 text-sm font-medium">
          <li><RouterLink to="/books" class="text-slate-300 hover:text-blue-500" active-class="text-blue-500">Books</RouterLink></li>
          <li><RouterLink to="/authors" class="text-slate-300 hover:text-blue-500" active-class="text-blue-500">Authors</RouterLink></li>
          <li><RouterLink to="/categories" class="text-slate-300 hover:text-blue-500" active-class="text-blue-500">Categories</RouterLink></li>
        </ul>

      </div>

      <!-- RIGHT -->
      <div class="flex items-center justify-end gap-4 w-2/5">

        <button class="bg-slate-700 p-2 rounded-lg hover:bg-blue-500 transition-colors">
          <Bell class="text-white" :size="20" />
        </button>

        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700">
          <img src="../../assets/profile.png" class="w-full h-full object-cover" />
        </div>

      </div>

    </nav>
  </header>
</template>

<script setup lang="ts">
import { Bell, Library } from 'lucide-vue-next'
</script>