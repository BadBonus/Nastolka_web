<script setup lang="ts">
// 	 type TFilterSortPanelSearchSort = {

// 	}

defineOptions({
  name: "FilterSortPanelSearchSort",
});

const search = defineModel<string | number | undefined>();
// const sort = defineModel<null | boolean>("sort");
const sort = defineModel<undefined | boolean>("sort");

const stylesForSortBtn = computed(() => ({
  style: {
    background:
      sort.value == undefined
        ? "var(--color-neutral-light)"
        : "var(--color-primary)",
    color:
      sort.value != undefined
        ? "var(--color-white)"
        : "var(--color-dark-brown)",
  },
  icon:
    sort.value == undefined || sort.value === true
      ? "heroicons-solid:bars-arrow-up"
      : "heroicons-solid:bars-arrow-down",
}));

const emit = defineEmits<{
  (e: "update:sort", value: boolean | undefined): void;
}>();

function changeSort() {
  const next = {
    undefined: true,
    true: false,
    false: undefined,
  } as const;

  sort.value = next[String(sort.value) as keyof typeof next];
}
</script>
<template>
  <div class="FilterSortPanelSearchSort border-x-shadow flex items-center">
    <UInput
      trailing
      v-model="search"
      icon="i-lucide-search"
      class="FilterSortPanelSearchSort__input"
    />
    <Button
      class="FilterSortPanelSearchSort__btn px-2"
      only-icon
      :icon="stylesForSortBtn.icon"
      :style="stylesForSortBtn.style"
      @click="changeSort"
    />
  </div>
</template>

<style>
.FilterSortPanelSearchSort {
  box-shadow: var(--shadow-box-elements);
  border-radius: 4px;
  .FilterSortPanelSearchSort__input {
    input {
      height: 36px;
      border-right: unset;
      box-shadow: unset;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .FilterSortPanelSearchSort__btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 2px solid var(--color-border);
    box-shadow: unset;
  }
}
</style>
