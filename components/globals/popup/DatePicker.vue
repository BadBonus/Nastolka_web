<script setup lang="ts">
const date = ref<Date>(new Date());
const formatDate = computed(() => {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formatter.format(date.value);
});
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
        :label="formatDate"
        variant="soft"
        class="shadow-button text-secondary border-2 border-black p-1!"
      />
    </div>

    <template #content="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>
