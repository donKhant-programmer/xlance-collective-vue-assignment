<template>
  <header class="border-b border-border bg-page">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <!-- LEFT -->
      <div class="flex items-center gap-8">
        <RouterLink to="/" class="flex items-center gap-2">
          <Library :size="22" class="text-blue-500" />
          <span class="font-bold text-lg text-primary">Library Manage</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <RouterLink to="/books" class="nav-link" active-class="nav-link-active">
              Books
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/authors" class="nav-link" active-class="nav-link-active">
              Authors
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/categories" class="nav-link" active-class="nav-link-active">
              Categories
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-4">
        <!-- Notification -->
        <Button variant="secondary" size="icon" class="rounded-lg bg-slate-700 border-none">
          <Bell :size="20" class="text-primary" />
        </Button>

        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700">
          <img src="/images/profile.png" class="w-full h-full object-cover" />
        </div>

        <!-- Mobile menu button -->
        <button class="md:hidden text-primary" @click="menuOpen = !menuOpen">
          <Menu :size="24" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="menuOpen" class="md:hidden border-t border-border bg-page px-6 py-4">
      <ul class="flex flex-col gap-4 text-sm font-medium">
        <li>
          <RouterLink to="/books" class="nav-link">Books</RouterLink>
        </li>
        <li>
          <RouterLink to="/authors" class="nav-link">Authors</RouterLink>
        </li>
        <li>
          <RouterLink to="/categories" class="nav-link">Categories</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Bell, Library, Menu } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';

  const menuOpen = ref(false);
</script>
