<template>
  <header class="bg-[#101922] border-b border-gray-800">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      <!-- Left side: Logo + Text + Tabs -->
      <div class="flex items-center gap-8 w-[60%]">
        <!-- Logo / Icon -->
        <RouterLink to="/" class="flex items-center gap-2">
          <!-- Icon (replace with your actual logo if needed) -->
          <div class="text-[#137FEC]">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-bell" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0h6z"/>
            </svg>
          </div>

          <!-- Website Name -->
          <span class="text-white font-bold text-[18px]">Library Manager</span>
        </RouterLink>

        <!-- Tabs -->
        <ul class="flex items-center gap-6 text-sm font-medium">
          <li>
            <RouterLink
              to="/books"
              class="text-[#CBD5E1] hover:text-[#137FEC]"
              active-class="text-[#137FEC]"
            >
              Books
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/authors"
              class="text-[#CBD5E1] hover:text-[#137FEC]"
              active-class="text-[#137FEC]"
            >
              Authors
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/categories"
              class="text-[#CBD5E1] hover:text-[#137FEC]"
              active-class="text-[#137FEC]"
            >
              Categories
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Right side: Bell + Profile -->
      <div class="flex items-center gap-4 w-[40%] justify-end">
        <!-- Bell -->
        <button
          class="bg-[#233648] p-2 rounded-lg hover:bg-[#137FEC] transition-colors"
          title="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-bell" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0h6z"/>
          </svg>
        </button>

        <!-- Profile -->
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#137FEC]">
          <img src="@/assets/profile.png" alt="Profile" class="w-full h-full object-cover"/>
        </div>
      </div>

    </nav>
  </header>
</template>

<script setup lang="ts">
// No extra script needed for now
</script>

<style scoped>
.icon-bell {
  width: 1.5rem;
  height: 1.5rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>