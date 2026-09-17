<script setup lang="ts">
defineOptions({ name: 'UiEmptyState' });

withDefaults(
  defineProps<{
    title?: string;
    actionLabel?: string;
  }>(),
  {
    title: 'Эх, я ничего не нашёл =(',
  }
);

const emit = defineEmits<{
  (e: 'action'): void;
}>();
</script>

<template>
  <div
    class="bg-card-decorate out flex w-fit flex-col items-center justify-center rounded-xl border-2 border-solid border-black p-1 text-center"
  >
    <div class="rounded-lg border-2 border-dashed border-black py-2">
      <NuxtImg src="/images/no_data.webp" alt="Нет данных" class="mb-4 w-full max-w-xs object-contain" />
      <h3 class="text-background text-xl font-semibold">
        {{ title }}
      </h3>
      <div v-if="actionLabel" class="my-4">
        <UButton color="neutral" variant="outline" type="button" @click="emit('action')">
          {{ actionLabel }}
        </UButton>
      </div>
    </div>
  </div>
</template>
