<template>
  <header class="border-b border-default bg-slate-900">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <!-- LEFT -->
      <div class="flex items-center gap-8 w-3/5">
        <RouterLink to="/" class="flex items-center gap-2">
          <Library :size="22" class="text-blue" />
          <span class="font-bold text-lg text-primary">Library Manage</span>
        </RouterLink>

        <ul class="flex items-center gap-6 text-sm font-medium">
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
      <div class="flex items-center justify-end gap-4 w-2/5">
        <!-- Notification -->
        <Button variant="secondary" size="icon" class="rounded-lg bg-slate-700 border-none">
          <Bell :size="20" class="text-primary" />
        </Button>

        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700">
          <img src="/images/profile.png" class="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { Bell, Library } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
</script>
