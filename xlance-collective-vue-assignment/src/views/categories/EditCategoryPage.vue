<template>
  <section class="min-h-screen bg-[#101922] flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/categories" class="text-[#64748B]">Categories</RouterLink>
          <span class="text-[#64748B]">></span>
          <span class="text-[#F1F5F9]">Edit: {{ form.name }}</span>
        </div>

        <RouterLink
          to="/categories"
          class="flex items-center gap-2 bg-[#233648] px-4 py-2 rounded-lg text-white text-sm hover:bg-[#137FEC]"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- HEADER -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-white">Edit Category: {{ form.name }}</h1>
        <p class="text-sm text-[#92ADC9]">
          Modify the category details and visibility settings for the library catalog.
        </p>
      </div>

      <!-- FORM -->
      <form class="bg-[#192633] rounded-xl p-10 space-y-8" @submit.prevent="updateCategory">
        <!-- NAME -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium"> Category Name </label>

          <input
            v-model="form.name"
            class="w-full bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />

          <p class="text-xs text-[#64748B]">
            The name as it will appear in the public library catalog.
          </p>
        </div>

        <!-- DESCRIPTION -->
        <div class="space-y-2">
          <label class="text-sm text-white font-medium"> Description </label>

          <textarea
            v-model="form.description"
            class="w-full h-28 bg-[#111A22] border border-[#324D67] rounded-lg px-3 py-2 text-white"
          />
        </div>

        <!-- ACTIVE STATUS -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[#F1F5F9] text-sm">Active Status</p>
            <p class="text-xs text-[#64748B]">
              Enable this to show the category in the discovery browse
            </p>
          </div>

          <!-- TOGGLE -->
          <button
            type="button"
            @click="form.active = !form.active"
            class="w-[44px] h-[24px] flex items-center rounded-full border-2 transition"
            :class="form.active ? 'bg-[#137FEC] border-black' : 'bg-gray-500 border-black'"
          >
            <div
              class="bg-white w-[18px] h-[18px] rounded-full shadow-md transform transition"
              :class="form.active ? 'translate-x-5' : 'translate-x-1'"
            />
          </button>
        </div>

        <!-- ACTIONS -->
        <div class="flex justify-end items-center gap-6 pt-4">
          <RouterLink to="/categories" class="text-[#94A3B8] text-sm font-medium">
            Discard Changes
          </RouterLink>

          <button type="submit" class="bg-[#137FEC] px-6 py-2 rounded-lg text-white font-medium">
            Update Category
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { CategoryService } from '@/services/CategoryService';
  import type { Category } from '@/models/category';

  const route = useRoute();
  const router = useRouter();

  const loading = ref(true);

  const form = ref<Category>({
    id: 0,
    name: '',
    description: '',
    bookCount: 0,
    updatedAt: '',
    active: true,
  });

  onMounted(async () => {
    try {
      const id = Number(route.params.id);
      form.value = await CategoryService.getById(id);
    } catch (e) {
      router.push('/categories');
    } finally {
      loading.value = false;
    }
  });

  const updateCategory = async () => {
    if (!form.value.name) return;

    await CategoryService.update(form.value);

    router.push('/categories');
  };
</script>
