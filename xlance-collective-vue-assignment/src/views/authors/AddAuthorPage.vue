<template>
  <section
    class="min-h-screen flex justify-center items-start py-12 px-4"
    style="background-color: var(--color-bg-primary)"
  >
    <div class="w-full max-w-3xl space-y-8">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm font-medium">
          <RouterLink to="/authors" style="color: var(--color-text-muted)"> Authors </RouterLink>

          <span style="color: var(--color-text-muted)">></span>

          <span style="color: var(--color-text-primary)"> Add New Author </span>
        </div>

        <Button
          as-child
          class="flex items-center gap-2 rounded-lg px-4 py-2"
          style="background-color: var(--color-slate-800); color: var(--color-text-primary)"
        >
          <RouterLink to="/authors"> ← Back to List </RouterLink>
        </Button>
      </div>

      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold" style="color: var(--color-text-primary)">Add New Author</h1>

        <p class="text-sm" style="color: var(--color-text-secondary)">
          Fill in the details to add a new literary contributor.
        </p>
      </div>

      <!-- FORM CARD -->
      <Card
        class="p-10 space-y-8 border"
        style="background-color: var(--color-bg-card); border-color: var(--color-border)"
      >
        <form @submit.prevent="submitForm" class="space-y-8">
          <!-- Author Portrait -->
          <div class="space-y-2">
            <label class="text-xl font-bold" style="color: var(--color-text-primary)">
              Author Portrait
            </label>

            <div
              @click="triggerFilePicker"
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="relative flex items-center justify-center border-2 rounded-lg h-56 cursor-pointer overflow-hidden"
              :style="{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-primary)',
              }"
            >
              <img
                v-if="form.imageUrl"
                :src="form.imageUrl"
                class="absolute inset-0 w-full h-full object-cover"
              />

              <div v-else class="text-center text-xs" style="color: var(--color-text-secondary)">
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
            <label
              class="text-sm font-medium flex items-center gap-1"
              style="color: var(--color-text-primary)"
            >
              Full Name
              <span class="text-red-500">*</span>
            </label>

            <Input
              v-model="form.name"
              placeholder="e.g., George Orwell"
              class="w-full rounded-xl border px-4 py-3"
              :style="inputStyle"
            />
          </div>

          <!-- Nationality -->
          <div class="space-y-2">
            <label
              class="text-sm font-medium flex items-center gap-1 text-[var(--color-text-primary)]"
            >
              Nationality
            </label>

            <Select v-model="form.nationality">
              <SelectTrigger class="w-full rounded-xl border px-4 py-3" :style="inputStyle">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent class="rounded-xl border" :style="inputStyle">
                <SelectItem value="British" class="select-item-hover"> British </SelectItem>

                <SelectItem value="American" class="select-item-hover"> American </SelectItem>

                <SelectItem value="Japanese" class="select-item-hover"> Japanese </SelectItem>

                <SelectItem value="French" class="select-item-hover"> French </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Biography -->
          <div class="space-y-2">
            <label class="text-sm font-medium" style="color: var(--color-text-primary)">
              Biography
            </label>

            <Textarea
              v-model="form.biography"
              placeholder="Write a brief biography of the author..."
              class="h-40 rounded-xl border px-4 py-3"
              :style="inputStyle"
            />

            <p class="text-xs" style="color: var(--color-text-secondary)">
              Recommended length: 100–500 words
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end items-center gap-4 pt-4">
            <RouterLink
              to="/authors"
              class="text-sm font-medium hover:underline"
              style="color: var(--color-text-secondary)"
            >
              Cancel
            </RouterLink>

            <Button
              type="submit"
              class="px-8 py-2.5 rounded-xl text-white"
              style="background-color: var(--color-blue)"
            >
              Save Author
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { AuthorService } from '@/services/AuthorService';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Card } from '@/components/ui/card';

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

  const inputStyle = {
    backgroundColor: 'var(--color-input-bg)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  };

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
    if (target.files?.[0]) {
      setFile(target.files[0]);
    }
  }

  function handleDrop(e: DragEvent) {
    if (e.dataTransfer?.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  function setFile(file: File) {
    if (!file.type.startsWith('image/')) return;

    form.image = file;
    form.imageUrl = URL.createObjectURL(file);
  }

  async function submitForm(): Promise<void> {
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
