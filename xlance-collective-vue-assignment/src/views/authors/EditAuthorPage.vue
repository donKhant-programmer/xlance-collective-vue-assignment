<template>
  <section class="min-h-screen bg-slate-900 flex justify-center items-start py-12 px-4">
    <div class="w-full max-w-3xl">
      <!-- Breadcrumb + Back -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2 text-sm font-medium text-muted">
          <RouterLink to="/authors" class="hover:underline">Authors</RouterLink>
          <span>&gt;</span>
          <span class="text-primary">Edit: {{ form.name }}</span>
        </div>

        <RouterLink
          to="/authors"
          class="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-primary text-sm select-item-hover transition"
        >
          ← Back to List
        </RouterLink>
      </div>

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-primary">Edit Author</h1>
        <p class="text-sm text-secondary">Update the details of {{ form.name }}.</p>
      </div>

      <!-- Edit Header -->
      <div
        class="p-8 rounded-2xl flex items-center justify-between gap-4 bg-card border border-border mb-8"
      >
        <div class="flex items-center gap-4">
          <img
            :src="form.imageUrl || '/placeholder.png'"
            alt="Author"
            class="w-20 h-20 rounded-2xl border border-border object-cover"
          />
          <span class="text-primary font-bold text-[20px]">
            {{ form.name || 'Author Name' }}
          </span>
        </div>

        <Button
          type="button"
          @click="triggerFilePicker"
          class="flex items-center gap-2 bg-blue hover:bg-blue/90 text-primary text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 overflow-hidden"
        >
          <img src="/svg/add-photo.svg" class="h-4 w-4 object-contain" alt="Add Photo" />
          Update Profile Photo
        </Button>

        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/png, image/jpeg"
          @change="handleFileChange"
        />
      </div>

      <!-- FORM -->
      <form
        class="p-10 rounded-2xl bg-card border border-border space-y-8"
        @submit.prevent="submitForm"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Author Name -->
          <div class="space-y-2">
            <label class="text-sm font-medium flex items-center gap-1 text-primary">
              Author Name
              <span class="text-[var(--color-red)]">*</span>
            </label>

            <Input
              v-model="form.name"
              placeholder="e.g., Haruki Murakami"
              class="w-full rounded-xl border px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70"
            />
          </div>

          <!-- Nationality -->
          <div class="space-y-2">
            <label class="text-sm font-medium flex items-center gap-1 text-primary">
              Nationality
              <span class="text-[var(--color-red)]">*</span>
            </label>

            <Select v-model="form.nationality">
              <SelectTrigger
                class="w-full rounded-xl border px-4 py-3 bg-slate-900 border-border text-primary"
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent class="input-bg border border-border input-text rounded-xl">
                <SelectItem value="British" class="select-item-hover">British</SelectItem>
                <SelectItem value="American" class="select-item-hover">American</SelectItem>
                <SelectItem value="Japanese" class="select-item-hover">Japanese</SelectItem>
                <SelectItem value="French" class="select-item-hover">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Date of Birth -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-primary"> Date of Birth </label>

            <Input
              type="date"
              v-model="form.dob"
              class="w-full rounded-xl border px-4 py-3 pr-10 bg-slate-900 border-border text-primary appearance-none"
            />
          </div>

          <!-- Primary Genre -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-primary"> Primary Genre </label>

            <Input
              v-model="form.genre"
              placeholder="e.g., Magical Realism"
              class="w-full rounded-xl border px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70"
            />
          </div>
        </div>

        <!-- Biography -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-primary"> Biography </label>

          <Textarea
            v-model="form.bio"
            placeholder="Write a brief biography of the author..."
            class="w-full rounded-xl border px-4 py-3 bg-slate-900 border-border text-primary placeholder:text-primary placeholder:opacity-70 h-40"
          />

          <p class="text-xs text-secondary">Recommended length: 100–500 words</p>
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-end gap-4 pt-4">
          <RouterLink to="/authors" class="text-sm font-medium text-secondary hover:underline">
            Cancel
          </RouterLink>

          <Button
            type="submit"
            class="bg-blue hover:bg-blue/90 text-primary px-8 py-2.5 rounded-xl hover:opacity-90"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { AuthorService } from '@/services/AuthorService';
  import type { Author } from '@/models/author';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { Button } from '@/components/ui/button';

  const author = ref<Author | null>(null);
  const router = useRouter();
  const route = useRoute();
  const fileInput = ref<HTMLInputElement | null>(null);

  const form = reactive({
    id: 0,
    name: '',
    nationality: '',
    dob: '',
    genre: '',
    bio: '',
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

  function setFile(file: File): void {
    if (!file.type.startsWith('image/')) return;
    form.image = file;
    form.imageUrl = URL.createObjectURL(file);
  }

  async function loadData(): Promise<void> {
    const id = Number(route.params.id);
    const data = await AuthorService.getById(id);

    if (!data) {
      router.push('/authors');
      return;
    }

    author.value = data;

    form.id = data.id;
    form.name = data.name;
    form.nationality = data.nationality;
    form.dob = data.dob || '';
    form.genre = data.genre || '';
    form.bio = data.biography || '';
    form.imageUrl = data.imageUrl || '';
  }

  onMounted(loadData);

  async function submitForm(): Promise<void> {
    if (!form.name || !form.nationality) return;

    await AuthorService.update({
      id: form.id,
      name: form.name,
      nationality: form.nationality,
      genre: form.genre,
      dob: form.dob,
      biography: form.bio,
      image: form.image ?? undefined,
    });

    router.push('/authors');
  }
</script>
