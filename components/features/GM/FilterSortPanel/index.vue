<script setup lang="ts">
import SortViaAttrsPanel from "./SortViaAttrsPanel.vue";
import SearchSort from "./SearchSort.vue";
import { game_adv_types } from "@/shared/gameAttrs";
import { titles } from "./utils";
import { game_platforms, game_systems, game_genres } from "@/shared/gameAttrs";
import { radioBtns } from "./utils";

defineOptions({
  name: "GMFilterSortPanel",
});

const typesOfGame = game_adv_types.map((el) => ({
  value: el.id,
  label: el.name,
}));

const filters = ref<{
  typeOfGame?: (typeof typesOfGame)[number];
  sortWith?: (typeof radioBtns)[number]["value"];
  search?: string | number;
  sort?: boolean;
  platforms?: string[];
  game_systems?: string[];
  game_genres?: string[];
}>({
  typeOfGame: undefined,
  sortWith: undefined,
  search: undefined,
  sort: undefined,
  platforms: undefined,
  game_systems: undefined,
  game_genres: undefined,
});
</script>
<template>
  <section class="GMFilterSortPanel">
    <div class="mt-2.5">
      <h2 class="block text-center text-2xl font-black">Тип ведения игры</h2>

      <Radiogroup
        class="mt-2 w-full justify-evenly"
        v-model="filters.typeOfGame"
        :items="typesOfGame"
        bottom-labels
        only-value
      />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-black">Приоритет по:</h2>
      <span class="text-bold block text-center text-lg">
        {{ titles[filters.sortWith as keyof typeof titles] ?? "Не выбрано" }}
      </span>
      <SortViaAttrsPanel v-model="filters.sortWith" class="mt-2.5" />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-black">
        Сортировка и поиск гм-ов
      </h2>
      <SearchSort v-model:sort="filters.sort" v-model="filters.search" />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">
        Платформы для проведения игры
      </h2>

      <USelectMenu
        multiple
        v-model="filters.platforms"
        :items="game_platforms"
        class="mt-2 w-full"
      />
    </div>
    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">Игровые системы</h2>

      <USelectMenu
        multiple
        v-model="filters.game_systems"
        :items="game_systems"
        class="mt-2 w-full"
      />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">Предпочитаемые жанры</h2>

      <USelectMenu
        multiple
        v-model="filters.game_genres"
        :items="game_genres"
        class="mt-2 w-full"
      />
    </div>
  </section>
</template>
