<script setup lang="ts">
import FilterRow from "./FilterRow.vue";
import RowOrigin from "./RowOrigin.vue";

defineOptions({
  name: "GameCalendarHeader",
});

const search = defineModel<string>("search");
const isAllVars = defineModel<boolean>("isAllVars");
const choosedDate = defineModel<Date | null | undefined>("choosedDate");

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const emit = defineEmits<{
  (e: "changeDate", date: any): void;
}>();
const changeDate = (data: Date) => {
  emit("changeDate", data);
};
</script>
<template>
  <header class="GameCalendarHeader">
    <CalendarRow @change-date="changeDate" v-model="choosedDate" />
    <RowOrigin v-model="search" v-model:is-all-vars="isAllVars" />
    <div class="sticky">
      <FilterRow class="mt-3" />
    </div>

    <Button
      variant="secondary"
      icon="material-symbols:arrow-upward-rounded"
      class="fixed bottom-3 left-3 z-50"
      @click="scrollToTop"
    />
    <UModal
      title="Фильтры"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <!-- <Button
        size="lg"
        variant="secondary"
        icon="lucide:settings-2"
        class="fixed right-3 bottom-3 z-50"
      >
        13
      </Button> -->

      <template #body>
        <GameCalendarModalFilters />
      </template>
    </UModal>
  </header>
</template>
