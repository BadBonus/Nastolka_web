<script setup lang="ts">
import MonthYear from "./MonthYear.vue";
// import Days from "./Days.vue";
import { getCurrentWeek } from "./utils";

type TDayInfo = {
  id: string;
  name: string;
  addInfo?: string | number;
  active?: boolean;
  outOfRange?: boolean;
  [key: string]: any;
};

defineOptions({
  name: "CalendarRow",
});

const choosedDate = ref<Date>(new Date());

const days = computed<TDayInfo[]>(() => {
  return getCurrentWeek(choosedDate.value).map((el) => {
    const active =
      el.date.getDate() + el.date.getMonth() ===
      choosedDate.value.getDate() + choosedDate.value.getMonth();

    return {
      id: el.date.toISOString(),
      name: el.weekdayName,
      addInfo: el.dayNumber,
      outOfRange: el.date.getMonth() != choosedDate.value.getMonth(),
      active,
      ...el,
    };
  });
});

const changeDate = (item: {
  [key: string]: any;
  id: string;
  name: string;
  addInfo?: string | number;
  active?: boolean;
  outOfRange?: boolean;
}) => {
  if (item.date instanceof Date) {
    choosedDate.value = item.date;
  }
};

const changeWeek = (side: "left" | "right") => {
  const newDate = new Date(
    days.value[side === "left" ? 0 : days.value.length - 1].date,
  );
  newDate.setDate(newDate.getDate() + (side === "left" ? -1 : 1));
  choosedDate.value = newDate;
};
</script>

<template>
  <div class="CalendarRow max-w-[360px]">
    <MonthYear v-model="choosedDate" />
    <ItemsPickSelector
      @changeViaArrow="changeWeek"
      @change="changeDate"
      :items="days"
      class="mt-4"
    />
  </div>
</template>

<!-- <style lang="scss"></style> -->
