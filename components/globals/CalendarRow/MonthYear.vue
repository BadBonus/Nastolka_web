<script setup lang="ts">
// 	 type TCalendarRowMonthYear = {

// 	}

defineOptions({
  name: "CalendarRowMonthYear",
});

const model = defineModel<Date>();
const comDate = computed<{
  month: string | null;
  year: number | null;
}>(() => ({
  month: model.value?.toLocaleString("default", { month: "short" }) ?? null,
  year: model.value?.getFullYear() ?? null,
}));

const currentYear = new Date().getFullYear();
const data = ref<number[]>([currentYear, currentYear + 1, currentYear + 2]);
const startIndex = computed(() =>
  data.value.findIndex((el) => comDate.value.year === el),
);

const acceptYear = (year: number) => {
  const newDate = new Date(model.value as Date);
  newDate.setFullYear(year);
  model.value = newDate;
  // P.S. такая конструкция для реактивности нужна
};
</script>
<template>
  <div class="CalendarRowMonthYear flex justify-between text-sm font-semibold">
    <span>{{ comDate.month }}</span>
    <UPopover>
      <span>{{ comDate.year }}</span>
      <template #content>
        <CarouselsSimpleNumeric
          :startIndex="startIndex"
          @change="acceptYear"
          :items="data"
        />
      </template>
    </UPopover>
  </div>
</template>

<!--<style lang="scss"></style>-->
