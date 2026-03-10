<template>
  <footer
    class="border-t"
    style="border-color: var(--color-border); background-color: var(--color-slate-900)"
  >
    <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
      <!-- LEFT -->
      <p class="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
        <span class="text-[var(--color-text-muted)]">©</span> 2026 Library Management System. All
        rights reserved.
      </p>

      <!-- RIGHT -->
      <ul class="flex items-center gap-6 text-sm font-normal text-[var(--color-text-muted)]">
        <li>
          <a href="#" class="hover:text-[var(--color-blue)] transition">Terms of Service</a>
        </li>
        <li>
          <a href="#" class="hover:text-[var(--color-blue)] transition">Privacy Policy</a>
        </li>
        <li class="flex items-center gap-1">
          <a href="#" class="hover:text-[var(--color-blue)] transition">Help Center</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
