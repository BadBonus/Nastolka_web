<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    retryLabel?: string;
    isRetrying?: boolean;
  }>(),
  {
    title: 'Не удалось загрузить данные',
    description: 'Произошла ошибка при получении информации. Попробуйте повторить попытку.',
    retryLabel: 'Повторить',
    isRetrying: false,
  }
);

const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center"
  >
    <h3 class="text-base font-semibold text-gray-900">
      {{ title }}
    </h3>
    <p class="mt-1 max-w-sm text-sm text-gray-500">
      {{ description }}
    </p>
    <div class="mt-4">
      <button
        type="button"
        :disabled="isRetrying"
        @click="emit('retry')"
        class="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50"
      >
        <span v-if="isRetrying">Загрузка...</span>
        <span v-else>{{ retryLabel }}</span>
      </button>
    </div>
  </div>
</template>
