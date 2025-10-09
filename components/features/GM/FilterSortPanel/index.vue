<script setup lang="ts">
import SortViaAttrsPanel from "./SortViaAttrsPanel.vue";
import { game_adv_types } from "@/shared/gameAttrs";
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

const filters = ref({
  typeOfGame: undefined,
  sortWith: undefined,
});
</script>
<template>
  <section class="GMFilterSortPanel">
    <div class="mt-1">
      <span class="block text-center text-xl"> Тип ведения игры </span>

      <Radiogroup
        class="mt-2 w-full justify-evenly"
        v-model="filters.typeOfGame"
        :items="typesOfGame"
        bottom-labels
        only-value
      />
    </div>
    <SortViaAttrsPanel v-model="filters.sortWith" class="mt-2.5" />
    <mark>{{ filters }}</mark>
  </section>
</template>

<!--<style lang="scss"></style>-->
