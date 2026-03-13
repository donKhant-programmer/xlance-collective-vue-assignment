<template>
    <div class="max-w-4xl mx-auto p-10 bg-card rounded-xl shadow-md w-full">
      <form @submit.prevent="submitForm" class="space-y-10">
        <!-- Cover Image -->
        <div class="flex flex-col gap-3">
          <label class="text-xl font-bold text-primary"> Cover Image </label>
          <div
            @click="triggerFilePicker"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="relative flex items-center justify-center border-2 border-border rounded-lg h-64 cursor-pointer overflow-hidden bg-form-field"
          >
            <img
              v-if="form.coverImageUrl"
              :src="form.coverImageUrl"
              class="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div v-else class="flex flex-col items-center text-center gap-2 px-4 text-secondary">
              <img src="/svg/upload-placeholder.svg" class="h-8 w-8" />
              <p class="text-xs">
                Click to upload or drag & drop <br />
                PNG, JPG, or SVG (MAX. 800x800px)
              </p>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
        </div>
  
        <!-- Book Information -->
        <div class="space-y-6">
          <label class="text-xl font-bold text-primary"> Book Information </label>
  
          <div class="flex gap-6 flex-wrap">
            <div class="flex-1 flex flex-col gap-1">
              <label class="text-sm text-secondary">Book Title</label>
              <Input
                v-model="form.title"
                placeholder="e.g. The Great Gatsby"
                class="rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
              />
            </div>
  
            <div class="flex-1 flex flex-col gap-1">
              <label class="text-sm text-secondary">Published Year</label>
              <Input
                v-model="form.year"
                type="number"
                placeholder="e.g. 1925"
                class="rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
              />
            </div>
          </div>
  
          <div class="flex gap-6 flex-wrap">
            <div class="flex-1 flex flex-col gap-1">
              <label class="text-sm text-secondary">Author</label>
              <Select v-model="form.authorId">
                <SelectTrigger class="rounded-xl border px-4 py-3 bg-form-field border-border text-primary">
                  <SelectValue placeholder="Select an author..." />
                </SelectTrigger>
                <SelectContent class="rounded-xl border border-border shadow-lg input-bg input-text">
                  <SelectItem
                    v-for="author in authors"
                    :key="author.id"
                    :value="author.id"
                    class="select-item-hover"
                  >
                    {{ author.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
  
            <div class="flex-1 flex flex-col gap-1">
              <label class="text-sm text-secondary">Category</label>
              <Select v-model="form.categoryId">
                <SelectTrigger class="rounded-xl border px-4 py-3 bg-form-field border-border text-primary">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent class="rounded-xl border border-border shadow-lg input-bg input-text">
                  <SelectItem
                    v-for="cat in categories"
                    :key="cat.id"
                    :value="cat.id"
                    class="select-item-hover"
                  >
                    {{ cat.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
  
          <div class="flex-1 flex flex-col gap-1">
            <label class="text-sm text-secondary">Availability Status</label>
            <Select v-model="form.status">
              <SelectTrigger class="rounded-xl border px-4 py-3 bg-form-field border-border text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="rounded-xl border border-border shadow-lg input-bg input-text">
                <SelectItem value="AVAILABLE" class="select-item-hover"> AVAILABLE </SelectItem>
                <SelectItem value="BORROWED" class="select-item-hover"> BORROWED </SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <!-- Description -->
          <div class="flex flex-col gap-2">
            <label class="text-sm text-secondary"> Book Summary </label>
            <Textarea
              v-model="form.description"
              placeholder="Brief overview..."
              class="h-32 rounded-xl border px-4 py-3 bg-form-field border-border text-primary"
            />
          </div>
        </div>
  
        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4">
          <RouterLink v-if="cancelLink" :to="cancelLink" class="text-sm font-medium hover:underline text-secondary">
            Cancel
          </RouterLink>
  
          <Button type="submit" class="px-8 py-2.5 rounded-xl text-primary bg-blue hover:bg-blue/90">
            <slot>Submit</slot>
          </Button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, watch } from "vue";
  import { RouterLink } from "vue-router";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  import type { Author } from "@/models/author";
  import type { Category } from "@/models/category";
  
  const props = defineProps<{
    modelValue: any;
    authors: Author[];
    categories: Category[];
    cancelLink?: string;
  }>();
  
  const emit = defineEmits(["update:modelValue", "submit"]);
  
  const form = reactive({
    title: "",
    year: undefined as number | undefined,
    authorId: null as number | null,
    categoryId: null as number | null,
    status: "AVAILABLE",
    description: "",
    coverImage: null as File | null,
    coverImageUrl: "",
  });
  
  // Sync props.modelValue to form
  watch(
    () => props.modelValue,
    (val) => {
      if (val) Object.assign(form, val);
    },
    { deep: true, immediate: true }
  );
  
  const fileInput = ref<HTMLInputElement | null>(null);
  
  function triggerFilePicker(): void {
    fileInput.value?.click();
  }
  
  function handleDrop(e: DragEvent): void {
    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  }
  
  function handleFileChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) setFile(target.files[0]);
  }
  
  function setFile(file: File): void {
    if (!file.type.startsWith("image/")) return;
    form.coverImage = file;
    form.coverImageUrl = URL.createObjectURL(file);
  }
  
  function submitForm(): void {
    emit("submit", form);
  }
  </script>