<template>
  <div class="max-w-4xl mx-auto p-10 bg-card rounded-xl shadow-md w-full">
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Author Portrait -->
      <div class="space-y-2">
        <label class="text-xl font-bold text-primary"> Author Portrait </label>

        <div
          @click="triggerFilePicker"
          @dragover.prevent
          @drop.prevent="handleDrop"
          class="relative flex items-center justify-center border-2 border-border bg-form-field rounded-lg h-56 cursor-pointer overflow-hidden"
        >
          <img
            v-if="form.imageUrl"
            :src="form.imageUrl"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div v-else class="text-primary text-center text-sm font-normal">
            Click to upload or drag & drop <br />
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

      <!-- Full Name -->
      <div class="space-y-2">
        <label class="text-sm font-medium flex items-center gap-1 text-primary">
          Full Name <span class="text-red-500">*</span>
        </label>
        <Input
          v-model="form.name"
          placeholder="e.g., George Orwell"
          class="w-full rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
        />
      </div>

      <!-- Nationality -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-primary"> Nationality </label>
        <Select v-model="form.nationality">
          <SelectTrigger
            class="w-full rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
          >
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent class="rounded-xl border bg-form-field border-border text-primary">
            <SelectItem value="British" class="select-item-hover">British</SelectItem>
            <SelectItem value="American" class="select-item-hover">American</SelectItem>
            <SelectItem value="Japanese" class="select-item-hover">Japanese</SelectItem>
            <SelectItem value="French" class="select-item-hover">French</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Biography -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-primary"> Biography </label>
        <Textarea
          v-model="form.biography"
          placeholder="Write a brief biography of the author..."
          class="h-40 rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
        />
        <p class="text-xs text-secondary">Recommended length: 100–500 words</p>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end items-center gap-4 pt-4">
        <RouterLink to="/authors" class="text-sm font-medium text-secondary hover:underline">
          Cancel
        </RouterLink>

        <Button type="submit" class="px-8 py-2.5 rounded-xl text-primary bg-blue-500">
          Save Author
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

  const emit = defineEmits<{
    (
      e: 'submit',
      data: { name: string; nationality: string; biography: string; image?: File },
    ): void;
  }>();

  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    name: '',
    nationality: '',
    biography: '',
    image: null as File | null,
    imageUrl: '',
  });

  function triggerFilePicker(): void {
    fileInput.value?.click();
  }

  function handleFileChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) setFile(target.files[0]);
  }

  function handleDrop(e: DragEvent): void {
    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  }

  function setFile(file: File): void {
    if (!file.type.startsWith('image/')) return;
    form.image = file;
    form.imageUrl = URL.createObjectURL(file);
  }

  function submitForm(): void {
    if (!form.name || !form.nationality) return;

    emit('submit', {
      name: form.name,
      nationality: form.nationality,
      biography: form.biography,
      image: form.image ?? undefined,
    });
  }
</script>
