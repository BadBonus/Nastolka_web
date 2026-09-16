<script setup lang="ts">
import { useUrlFilters } from '#imports';
import useOrgFlow from '@/composables/use-cases/useOrgFlow';

defineOptions({
  name: 'Org',
});

const {
  orgs: {
    items,
    getItems,
    meta,
    loading,
    error,
    q,
    page,
    limit,
    sortOrder,
    filters,
    canNext,
    canPrev,
    getNextPage,
    getPrevPage,
    setFilters,
    resetMeta,
    refresh,
  },
} = useOrgFlow();

type TFilters = {
  page: number;
  search: string;
  sortOrder: 'asc' | 'desc';
};

const urlFilters = useUrlFilters<TFilters>({
  page: 1,
  search: '',
  sortOrder: 'desc',
});

getItems();
</script>

<template>
  <section class="GmPage">
    {{ urlFilters }}
    <br />
    <ul class="flex flex-wrap justify-center gap-4.5">
      <li class="w-65" v-for="(item, index) in items" :key="item.id">
        <GmCard
          :games-count="11"
          v-bind="item"
          avatar="https://imgcdn.stablediffusionweb.com/2024/9/29/e10091e9-5331-4917-abf3-7d937ea3de8b.jpg"
          class="min-h-85"
          :style="{ '--i': index + 1 }"
          random-font
        />
      </li>
    </ul>
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
