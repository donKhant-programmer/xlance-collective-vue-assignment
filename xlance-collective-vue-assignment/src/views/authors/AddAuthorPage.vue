<template>
  <section class="min-h-screen bg-[#101922] flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/authors" class="text-[#64748B]">Authors</RouterLink>
          <span class="text-[#64748B]">></span>
          <span class="text-[#F1F5F9]">Add New Author</span>
        </div>

        <Button
          as-child
          class="bg-[#233648] hover:bg-[#137FEC] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <RouterLink to="/authors"> ← Back to List </RouterLink>
        </Button>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-white">Add New Author</h1>
        <p class="text-sm text-[#92ADC9]">Fill in the details to add a new literary contributor.</p>
      </div>

      <!-- FORM -->
      <form
        @submit.prevent="submitForm"
        class="bg-[#192633] border border-[#192633] rounded-xl p-10 space-y-8"
      >
        <!-- AUTHOR PORTRAIT -->
        <div class="space-y-2">
          <Label class="text-xl font-bold text-white">Author Portrait</Label>

          <div
            @click="triggerFilePicker"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="relative flex items-center justify-center border-2 border-[#324D67] rounded-lg bg-[#101922] h-56 cursor-pointer overflow-hidden"
          >
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <div v-else class="text-center text-[#507A9E] text-xs font-normal">
              Click to upload or drag & drop<br />
              PNG, JPG (MAX. 800x800px)
            </div>

            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/png, image/jpeg"
              @change="handleFileChange"
            />
          </div>
        </div>

        <!-- FULL NAME -->
        <div class="space-y-2">
          <Label class="text-sm text-white font-medium">
            Full Name <span class="text-[#EF4444]">*</span>
          </Label>

          <Input
            v-model="form.name"
            placeholder="e.g., George Orwell"
            class="bg-[#111A22] border-[#324D67] text-white placeholder:text-white"
          />
        </div>

        <!-- NATIONALITY -->
        <!-- NATIONALITY -->
<div class="space-y-2">
  <Label class="text-sm text-white font-medium flex items-center gap-1">
    Nationality
    <span class="text-[#EF4444]">*</span>
  </Label>

  <Select v-model="form.nationality">
    <!-- Trigger -->
    <SelectTrigger class="w-full bg-[#111A22] border border-[#324D67] text-white rounded-lg">
      <SelectValue placeholder="Select country" class="text-white" />
    </SelectTrigger>

    <!-- Dropdown Content -->
    <SelectContent class="bg-[#111A22] border border-[#324D67] text-white rounded-lg mt-1">
      <SelectItem value="British" class="text-white hover:bg-[#137FEC] hover:text-white">
        British
      </SelectItem>
      <SelectItem value="American" class="text-white hover:bg-[#137FEC] hover:text-white">
        American
      </SelectItem>
      <SelectItem value="Japanese" class="text-white hover:bg-[#137FEC] hover:text-white">
        Japanese
      </SelectItem>
      <SelectItem value="French" class="text-white hover:bg-[#137FEC] hover:text-white">
        French
      </SelectItem>
    </SelectContent>
  </Select>
</div>

        <!-- BIOGRAPHY -->
        <div class="space-y-2">
          <Label class="text-sm text-white font-medium">Biography</Label>

          <Textarea
            v-model="form.biography"
            class="bg-[#111A22] border-[#324D67] text-white h-40 placeholder:text-white"
            placeholder="Write a brief biography of the author..."
          />

          <p class="text-xs text-[#507A9E]">Recommended length: 100–500 words</p>
        </div>

        <!-- BUTTONS -->
        <div class="flex justify-end items-center gap-4 pt-4">
          <Button as-child class="text-[#94A3B8] text-sm font-medium">
            <RouterLink to="/authors">Cancel</RouterLink>
          </Button>

          <Button
            type="submit"
            class="bg-[#137FEC] hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-medium"
          >
            Save Author
          </Button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { AuthorService } from '@/services/AuthorService';

  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Button } from '@/components/ui/button';
  import { Label } from '@/components/ui/label';

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

  const router = useRouter();
  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    name: '',
    nationality: '',
    biography: '',
    image: null as File | null,
    imageUrl: '',
  });

  function triggerFilePicker() {
    fileInput.value?.click();
  }

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) setFile(target.files[0]);
  }

  function handleDrop(e: DragEvent) {
    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  }

  function setFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    form.image = file;
    form.imageUrl = URL.createObjectURL(file);
  }

  async function submitForm() {
    if (!form.name || !form.nationality) return;

    await AuthorService.add({
      id: 0,
      name: form.name,
      nationality: form.nationality,
      biography: form.biography,
      genre: '',
      catalog: 0,
      image: form.image ?? undefined,
    });

    router.push('/authors');
  }
</script>
