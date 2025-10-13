<script setup lang="ts">
import SortViaAttrsPanel from "./SortViaAttrsPanel.vue";
import SearchSort from "./SearchSort.vue";
import { game_adv_types } from "@/shared/gameAttrs";
import { titles } from "./utils";

// 	 type TGMFilterSortPanel = {

// 	}

defineOptions({
  name: "GMFilterSortPanel",
});

const typeOfSort = ref("rating");

const typesOfGame = game_adv_types.map((el) => ({
  value: el.id,
  label: el.name,
}));

const demoRadio = [
  {
    value: 123,
    label: "mask",
  },
  {
    value: "a",
    maskIndicator: "game-icons:duality-mask",
    label: "mask",
  },
  {
    maskIndicator: "game-icons:duality-mask",
    value: "b",
  },
];

const filters = ref<{
  typeOfGame: (typeof typesOfGame)[number] | undefined;
  sortWith: (typeof demoRadio)[number] | undefined;
  search: string | number | undefined;
  sort: undefined | boolean;
}>({
  typeOfGame: undefined,
  sortWith: undefined,
  search: undefined,
  sort: undefined,
});
</script>
<template>
  <section class="GMFilterSortPanel">
    <div class="mt-1">
      <h2 class="block text-center text-2xl font-black">Тип ведения игры</h2>

      <Radiogroup
        class="mt-2 w-full justify-evenly"
        v-model="filters.typeOfGame"
        :items="typesOfGame"
        bottom-labels
        only-value
      />
    </div>

    <div class="mt-1">
      <h2 class="block text-center text-2xl font-black">Приоритет по:</h2>
      <span class="text-bold block text-center text-lg">
        {{ titles[filters.sortWith] ?? "Не выбрано" }}
      </span>
      <SortViaAttrsPanel v-model="filters.sortWith" class="mt-2.5" />
    </div>

    <div class="mt-1">
      <h2 class="block text-center text-2xl font-black">Сортировка и поиск</h2>
      <SearchSort v-model:sort="filters.sort" v-model="filters.search" />
    </div>
    <mark>{{ filters }}</mark>
  </section>
</template>

<!--<style lang="scss"></style>-->
