<script setup lang="ts">
import FilterRow from "./FilterRow.vue";
import RowOrigin from "./RowOrigin.vue";

defineOptions({
  name: "GameCalendarHeader",
});

const search = defineModel<string | number | undefined>("search");
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
  <header class="GameCalendarHeader papperPattern rounded px-2">
    <CalendarRow @change-date="changeDate" v-model="choosedDate" />
    <RowOrigin v-model="search" v-model:is-all-vars="isAllVars" />
    <div class="sticky">
      <FilterRow class="mt-3" />
    </div>

    <div
      class="fixed right-2 bottom-2 z-50 flex flex-col items-center justify-center gap-2"
    >
      <Button
        variant="filled"
        icon="material-symbols:arrow-upward-rounded"
        class="opacity-25 hover:opacity-100"
        @click="scrollToTop"
        rounded
        only-icon
      />
      <UModal
        title="Фильтры"
        :close="{
          color: 'primary',
          variant: 'outline',
          class: 'rounded-full',
        }"
      >
        <Button
          size="lg"
          variant="filled"
          color="secondary"
          icon="lucide:settings-2"
          class=""
        >
        </Button>

        <template #body>
          <GameCalendarModalFilters />
        </template>
      </UModal>
    </div>
  </header>
</template>

