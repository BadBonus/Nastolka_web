<script setup lang="ts">
import { CalendarDate, parseDate } from '@internationalized/date';

// const date = ref<Date>(new Date());

const date = shallowRef<Date | null>(null);
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
        class="text-default min-w-[138px] border-2"
      />
    </div>

    <template #content="{ close }">
      <UCalendar type="date" locale="ru-RU" v-model="date" is-required @close="close" />
      <!-- <DatePicker v-model="date" is-required @close="close" /> -->
    </template>
  </UPopover>
</template>
