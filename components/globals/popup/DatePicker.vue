<script setup lang="ts">
import { format } from "date-fns";

const date = ref<Date>(new Date());
</script>

<template>
  <UPopover
    :content="{
      align: 'center',
    }"
  >
    <div class="relative">
      <span class="text-text absolute -top-6 left-0 text-left text-sm font-bold"
        >Ваш д.р.</span
      >
      <UButton
        size="md"
        icon="i-heroicons-calendar-days-20-solid"
        :label="format(date, 'd MMM, yyy')"
        variant="soft"
        class="shadow-button"
      />
    </div>

    <template #content="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>
