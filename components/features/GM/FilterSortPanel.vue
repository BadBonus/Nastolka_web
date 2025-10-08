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
    label: "1",
    value: 123,
  },
  {
    label: "2",
    value: "a",
  },
  {
    label: "3",
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
      />

      <URadioGroup
        size="sm"
        orientation="horizontal"
        label-key="name"
        value-key="id"
        v-model="typeOfSort"
        :items="demo"
        :ui="{
          fieldset: 'justify-center',
        }"
      />
    </div>
  </section>
</template>

<!--<style lang="scss"></style>-->
