<script setup lang="ts">
import MonthYear from "./MonthYear.vue";
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
const emit = defineEmits<{
  (e: "changeDate", date: Date): void;
}>();

const model = defineModel<Date | null | undefined>();
const choosedDate = model.value ? model : ref<Date>(new Date());

const days = computed<TDayInfo[]>(() => {
  const date: Date | undefined = choosedDate.value ?? undefined;
  return getCurrentWeek(date).map((el) => {
    const active = !!(
      choosedDate.value &&
      el.date.getDate() === choosedDate.value.getDate() &&
      el.date.getMonth() === choosedDate.value.getMonth()
    );

    return {
      id: el.date.toISOString(),
      name: el.weekdayName,
      addInfo: el.dayNumber,
      outOfRange:
        el.date.getMonth() !=
        (choosedDate.value ? choosedDate.value.getMonth() : -1),
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
  emit("changeDate", choosedDate.value);
};

watch(choosedDate, (newD) => {
  console.log(newD);
});
</script>

<template>
  <div class="CalendarRow max-w-[360px]">
    <MonthYear v-model="choosedDate" />
    <ItemsPickSelector
      @change-via-arrow="changeWeek"
      @change="changeDate"
      :items="days"
      class="mt-4"
    />
  </div>
</template>
