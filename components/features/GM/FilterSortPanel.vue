<script setup lang="ts">
// 	 type TGMFilterSortPanel = {

// 	}

defineOptions({
  name: "GMFilterSortPanel",
});

const typeOfSort = ref("rating");

const demo = [
  {
    name: "Не важно",
    id: 123,
  },
  {
    name: "A",
    id: 3,
  },
  {
    name: "B",
    id: 12223,
  },
];

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

const model = ref(demoRadio[0]);
</script>
<template>
  <section class="GMFilterSortPanel">
    <div class="mt-1">
      <span class="block text-center text-xl"> Тип ведения игры </span>

      <Radiogroup
        class="w-full justify-center"
        v-model="model"
        :items="demoRadio"
        bottom-labels
      />
    </div>
  </section>
</template>

<!--<style lang="scss"></style>-->
