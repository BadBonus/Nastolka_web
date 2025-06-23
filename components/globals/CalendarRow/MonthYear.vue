<script setup lang="ts">
// 	 type TCalendarRowMonthYear = {

// 	}

defineOptions({
  name: "CalendarRowMonthYear",
});

const model = defineModel<Date>();

const formattedDate = (date: Date) =>
  date
    .toLocaleString("ru-RU", {
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");

const changeYear = (prev: boolean): void => {
  const newDate = new Date(model.value as Date);
  newDate.setFullYear(newDate.getFullYear() + (prev ? -1 : 1));
  model.value = newDate;
  // P.S. такая конструкция для реактивности нужна
};

const changeMonth = (prev: boolean): void => {
  const newDate = new Date(model.value as Date);
  newDate.setFullYear(
    model.value?.getFullYear() ?? newDate.getFullYear(),
    newDate.getMonth() + (prev ? -1 : 1),
  );
  model.value = newDate;
};
</script>
<template>
  <div
    class="CalendarRowMonthYear flex items-center justify-between text-sm font-semibold"
  >
    <div>
      <UButton
        @click="changeYear(true)"
        class="mr-3"
        variant="outline"
        size="md"
      >
        <Icon name="mdi:chevron-double-left" />
      </UButton>
      <UButton @click="changeMonth(true)" variant="outline" size="md">
        <Icon name="mdi:chevron-left" />
      </UButton>
    </div>

    <span>
      {{ formattedDate(model ?? new Date()) }}
    </span>

    <div>
      <UButton
        @click="changeMonth(false)"
        variant="outline"
        size="md"
        class="mr-3"
      >
        <Icon name="mdi:chevron-right" />
      </UButton>
      <UButton @click="changeYear(false)" variant="outline" size="md">
        <Icon name="mdi:chevron-double-right" />
      </UButton>
    </div>
  </div>
</template>

<!--<style lang="scss"></style>-->
