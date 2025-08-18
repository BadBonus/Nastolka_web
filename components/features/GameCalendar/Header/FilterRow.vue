<script setup lang="ts">
import {
  typesOfPlatformGame,
  typesOfCompany,
  statusesOfGame,
  cities,
} from "@/components/features/GameCalendar/ModalFilters/demoData";
import type { TModalFiltersFilterBadge } from "@/components/globals/FilterBadges.vue";

import type { CheckboxGroupItem, CheckboxGroupValue } from "@nuxt/ui";

// 	 type THeaderFilterRow = {

// 	}

defineOptions({
  name: "HeaderFilterRow",
});

const badges = ref<TModalFiltersFilterBadge[]>([
  { name: "test", count: 12 },
  { name: "asdad", count: 112 },
  { name: "test", count: 12 },
  { name: "asdad", count: 112 },
  { name: "test", count: 12 },
]);
const isFreeGames = ref<boolean>(false);

const typeOfAdventure = ref<CheckboxGroupItem[]>([]);
const typeOfPlatform = ref<string>(typesOfPlatformGame[0].id);
const statusGame = ref<string>(statusesOfGame[0]);
const places = ref<string[]>([]);
</script>
<template>
  <div class="HeaderFilterRow">
    <div class="mt-3">
      <span class="block text-center text-xl"> Место игры</span>

      <USelectMenu
        multiple
        v-model="places"
        :items="cities"
        class="mt-2 w-full"
      />
    </div>

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

    <Button
      class="mt-2 w-full"
      @click="isFreeGames = !isFreeGames"
      :variant="isFreeGames ? 'filled' : 'outline'"
    >
      <span class="block w-full text-center">Бесплатные игры</span>
    </Button>
    <section class="mt-4">
      <h3 class="block text-center text-xl">Выбранные фильтры</h3>
      <FilterBadges class="mt-3" v-model="badges" />
    </section>
  </div>
</template>
