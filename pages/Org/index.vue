<script setup lang="ts">
import useOrgFlow from '@/composables/use-cases/useOrgFlow';
import type { TOrgSearchParsed } from '@/components/features/Org/SearchFilter/mappers';

defineOptions({
  name: 'Org',
});

const { loadCatalog } = useOrgFlow();
const { items, getItems, meta, page, limit, applyQuery, resetFilters } = await loadCatalog();

function onSearchApply(parsed: TOrgSearchParsed) {
  void applyQuery({
    q: parsed.q,
    filters: parsed.preferredSystems ? { preferredSystems: parsed.preferredSystems } : {},
    page: 1,
  });
}

</script>

<template>
  <section class="GmPage">
    <OrgSearchFilter class="mx-auto w-full max-w-4xl" @apply="onSearchApply" />

    <div class="mb-8 text-center">
      <h1 class="mt-4 text-2xl font-bold">Найди своего профессионального гейм-мастера!</h1>
      <p class="">
        Здесь собираются такие же любители игр, как и ты! Каждый мастер - это уникальный мир со своими правилами и
        приключениями. Здесь ты точно сможешь найти любого мастера под свою нишу, жанр и игровую систему!
      </p>
    </div>

    <ul class="list-random-rotate -hover-straighten flex flex-wrap justify-center gap-4.5">
      <li class="w-65" v-for="(item, index) in items" :key="item.id">
        <GmCard
          :games-count="11"
          countOfGamesIsHidden
          v-bind="item"
          class="min-h-85"
          :style="{ '--i': index + 1 }"
          random-font
        />
      </li>
    </ul>
    <UiEmptyState
      class="mx-auto"
      @action="resetFilters"
      action-label="Очистить фильтры"
      v-if="!items.length"
      title="Ничего не найдено"
    />
    <UPagination
      v-if="meta.total > limit"
      @update:page="getItems({ page: $event, limit: limit })"
      class="mt-8 flex justify-center"
      v-model:page="page"
      :items-per-page="limit"
      :total="meta.total"
    />
  </section>
</template>

<style scoped>
.GmPage :deep(.GmCard_like) {
  --s1: sin(var(--i) * 7823.123);
  --s2: cos(var(--i) * 4157.891);
  --noise: calc((var(--s1) + var(--s2)) / 2);
  --angle: calc(var(--noise) * 35deg + 5deg);

  transform: rotate(var(--angle));
}
</style>
