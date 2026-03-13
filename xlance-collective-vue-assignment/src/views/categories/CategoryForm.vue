<template>
  <form
    class="p-10 rounded-2xl bg-card border border-border space-y-8"
    @submit.prevent="emit('submit', form)"
  >
    <!-- CATEGORY NAME -->
    <div class="space-y-2">
      <label class="text-sm font-medium flex items-center gap-1 text-primary">
        Category Name
        <span class="text-[var(--color-red)]">*</span>
      </label>

      <Input
        v-model="form.name"
        placeholder="e.g., Science Fiction"
        class="w-full rounded-xl border px-4 py-3 bg-form-field border-border text-primary placeholder:text-primary placeholder:opacity-70"
      />
    </div>

    <!-- DESCRIPTION -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-primary">
        Description
        <span class="text-secondary text-xs">(Optional)</span>
      </label>

      <Textarea
        v-model="form.description"
        placeholder="Briefly describe what books belong in this category..."
        class="w-full h-28 rounded-xl px-4 py-3 bg-form-field border-border text-primary placeholder:text-primary placeholder:opacity-70"
      />
    </div>

    <!-- TIP BOX -->
    <div class="flex items-start gap-2 rounded-xl p-3 bg-cardBg">
      <img src="/svg/info-circle.svg" class="h-4 w-4 mt-0.5 flex-shrink-0" />

      <div class="flex flex-col gap-4">
        <span class="font-medium text-xs text-blue-500"> Tip </span>

        <span class="text-xs font-normal text-secondary">
          Good category names are short and descriptive. You can later assign tags to specific books
          within these categories.
        </span>
      </div>
    </div>

    <!-- BUTTONS -->
    <div class="flex justify-end items-center gap-6 pt-4">
      <slot name="cancel"></slot>

      <Button
        type="submit"
        class="flex items-center gap-2 px-8 py-2.5 rounded-xl text-primary font-medium hover:opacity-90 bg-blue-500 hover:bg-blue-600"
      >
        <slot name="submit-label">Create Category</slot>
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { Button } from '@/components/ui/button';

  interface CategoryFormData {
    name: string;
    description: string;
  }

  const props = defineProps<{
    modelValue?: CategoryFormData;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: CategoryFormData): void;
    (e: 'submit', value: CategoryFormData): void;
  }>();

  const form = reactive<CategoryFormData>({
    name: props.modelValue?.name || '',
    description: props.modelValue?.description || '',
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        form.name = val.name;
        form.description = val.description;
      }
    },
    { deep: true },
  );
</script>
