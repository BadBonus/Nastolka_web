<script setup lang="ts">
import { type AnyCalendarDate, type CalendarDate } from '@internationalized/date';

const date = defineModel<AnyCalendarDate | undefined>({
  required: true,
});

const formatDate = computed(() => {
  return date.value?.toString() || 'нет данных';
});

const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <UPopover
    :content="{
      align: 'center',
    }"
  >
    <div class="relative">
      <span class="text-text absolute -top-6 left-0 text-left text-sm font-bold">{{ label }}</span>
      <UButton
        size="md"
        icon="i-heroicons-calendar-days-20-solid"
        :label="formatDate"
        variant="ghost"
        class="text-default min-w-34.5 border-2"
      />
    </div>

    <template #content="{ close }">
      <UCalendar type="date" locale="ru-RU" v-model="date as CalendarDate" is-required @close="close" />
    </template>
  </UPopover>
</template>
