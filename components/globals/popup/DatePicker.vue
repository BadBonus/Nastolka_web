<script setup lang="ts">
import { parseDate, CalendarDate, getLocalTimeZone } from '@internationalized/date';

const dateModel = defineModel<Date | undefined>({
  required: true,
});

const props = defineProps<{
  label: string;
}>();

const calendarValue = computed({
  get(): CalendarDate | undefined {
    if (!dateModel.value || !(dateModel.value instanceof Date)) return undefined;
    try {
      const year = dateModel.value.getFullYear();
      const month = String(dateModel.value.getMonth() + 1).padStart(2, '0');
      const day = String(dateModel.value.getDate()).padStart(2, '0');

      return parseDate(`${year}-${month}-${day}`);
    } catch {
      return undefined;
    }
  },
  set(val: CalendarDate | undefined) {
    if (!val) {
      dateModel.value = undefined;
      return;
    }
    dateModel.value = val.toDate(getLocalTimeZone());
  },
});

const formatDate = computed(() => {
  if (!dateModel.value || !(dateModel.value instanceof Date)) return 'нет данных';
  return dateModel.value.toLocaleDateString('ru-RU');
});
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
      <UCalendar type="date" locale="ru-RU" v-model="calendarValue" is-required @close="close" />
    </template>
  </UPopover>
</template>
