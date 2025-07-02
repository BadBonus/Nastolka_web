<script setup lang="ts">
import {
  typesOfPlatformGame,
  typesOfCompany,
  statusesOfGame,
} from "@/components/features/GameCalendar/ModalFilters/demoData";

import type { CheckboxGroupItem, CheckboxGroupValue } from "@nuxt/ui";

// 	 type THeaderFilterRow = {

// 	}

defineOptions({
  name: "HeaderFilterRow",
});

const badges = ref<any[]>([
  { name: "test", count: 12 },
  { name: "asdad", count: 112 },
]);

const typeOfAdventure = ref<CheckboxGroupItem[]>([]);
const typeOfPlatform = ref<string>(typesOfPlatformGame[0].id);
const statusGame = ref<string>(statusesOfGame[0]);
</script>
<template>
  <div class="HeaderFilterRow">
    <div class="mt-3">
      <span class="block text-center text-xl"> Тип компании</span>

      <UCheckboxGroup
        orientation="horizontal"
        size="sm"
        v-model="typeOfAdventure"
        :items="typesOfCompany"
        class="mx-auto"
        :ui="{
          fieldset: 'justify-center',
        }"
      />
    </div>

    <div class="mt-1">
      <span class="block text-center text-xl"> Тип ведения игры </span>

      <URadioGroup
        size="sm"
        orientation="horizontal"
        label-key="name"
        value-key="id"
        v-model="typeOfPlatform"
        :items="typesOfPlatformGame"
        :ui="{
          fieldset: 'justify-center',
        }"
      />
    </div>

    <div class="mt-1">
      <span class="block text-center text-xl"> Статус по подбору людей</span>

      <URadioGroup
        size="sm"
        orientation="horizontal"
        :ui="{
          fieldset: 'justify-center',
        }"
        v-model="statusGame"
        :items="statusesOfGame"
      />
    </div>

    <UButton class="mt-2 w-full" variant="outline">
      <span class="block w-full text-center">Бесплатные игры</span>
    </UButton>
    <FilterBadges class="mt-3" v-model="badges" />
  </div>
</template>
