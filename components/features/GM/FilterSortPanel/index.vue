<script setup lang="ts">
import SortViaAttrsPanel from './SortViaAttrsPanel.vue';
import SearchSort from './SearchSort.vue';
import { titles } from './utils';
import { GAME_SYSTEM_BADGES } from '#consts/gameSystems';
import { GameGenres, GamePlatform, GameSystem, SessionType } from '#openApi/enums';
import { formatUnderscoreToSpace } from '@/utils/transformers/formatUnderscoreToSpace';

defineOptions({
  name: 'GMFilterSortPanel',
});

const typesOfGame = SessionType.map((value) => ({
  value,
  label: formatUnderscoreToSpace(value),
}));

const platformItems = GamePlatform.map((value) => ({
  value,
  label: formatUnderscoreToSpace(value),
}));

const gameSystemItems = GameSystem.map((value) => ({
  value,
  label: GAME_SYSTEM_BADGES[value].shortLabel,
}));

const gameGenreItems = GameGenres.map((value) => ({
  value,
  label: formatUnderscoreToSpace(value),
}));

const filters = ref<{
  typeOfGame?: (typeof SessionType)[number];
  sortWith?: string;
  search?: string | number;
  sort?: boolean;
  platforms?: GamePlatform[];
  game_systems?: GameSystem[];
  game_genres?: GameGenres[];
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
        {{ titles[filters.sortWith as keyof typeof titles] ?? 'Не выбрано' }}
      </span>
      <SortViaAttrsPanel v-model="filters.sortWith" class="mt-2.5" />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-black">Сортировка и поиск гм-ов</h2>
      <SearchSort v-model:sort="filters.sort" v-model="filters.search" />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">Платформы для проведения игры</h2>

      <USelectMenu multiple v-model="filters.platforms" value-key="value" :items="platformItems" class="mt-2 w-full" />
    </div>
    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">Игровые системы</h2>

      <USelectMenu multiple v-model="filters.game_systems" value-key="value" :items="gameSystemItems" class="mt-2 w-full" />
    </div>

    <div class="mt-2.5">
      <h2 class="block text-center text-xl font-bold">Предпочитаемые жанры</h2>

      <USelectMenu multiple v-model="filters.game_genres" value-key="value" :items="gameGenreItems" class="mt-2 w-full" />
    </div>
  </section>
</template>
