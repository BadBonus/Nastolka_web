<script setup lang="ts">
import useOrgFlow from '@/composables/use-cases/useOrgFlow';
import type { TOrgIndexQuery } from '@/composables/actions/useOrg';
import { GameSystem } from '#openApi/enums';
import type { TSortByField } from '@/composables/useCatalogItems';

defineOptions({
  name: 'Org',
});

const route = useRoute();
const router = useRouter();

const SORT_BY_SET = new Set<TSortByField>(['createdAt', 'eventsCount', 'reviewsCount']);
const SORT_ORDER_SET = new Set<'asc' | 'desc'>(['asc', 'desc']);
const GAME_SYSTEM_SET = new Set<string>(GameSystem);

function parseNumberOrUndefined(input: unknown): number | undefined {
  if (input === undefined || input === null || input === '') return undefined;
  const str = String(input);
  if (!/^-?\d+(\.\d+)?$/.test(str)) return undefined;
  const n = Number(str);
  if (!Number.isFinite(n)) return undefined;
  return n;
}

function parseNonNegativeInt(input: unknown): number | undefined {
  const n = parseNumberOrUndefined(input);
  if (n === undefined) return undefined;
  if (!Number.isInteger(n) || n < 0) return undefined;
  return n;
}

function parseNonNegativeNumber(input: unknown): number | undefined {
  const n = parseNumberOrUndefined(input);
  if (n === undefined) return undefined;
  if (n < 0) return undefined;
  return n;
}

function parseStringArray(input: unknown): string[] {
  if (input === undefined || input === null) return [];
  if (Array.isArray(input)) return input.map((x) => (x == null ? '' : String(x))).filter((x) => x.length > 0);
  const str = String(input);
  return str.length > 0 ? [str] : [];
}

type TParsedOrgUrl = {
  initialQuery: {
    q?: string;
    page: number;
    limit: number;
    sortOrder: 'asc' | 'desc';
    sortBy?: TSortByField;
  };
  initialFilters: Partial<Omit<TOrgIndexQuery, keyof { q: any; page: any; limit: any; sortOrder: any; sortBy: any }>>;
};

function parseQueryFromRoute(query: typeof route.query): TParsedOrgUrl {
  const q = query.q ? String(query.q) : undefined;

  const rawPage = parseNonNegativeInt(query.page);
  const page = rawPage !== undefined && rawPage >= 1 ? rawPage : 1;

  const rawLimit = parseNonNegativeInt(query.limit);
  const limit = rawLimit !== undefined && rawLimit >= 1 ? rawLimit : 20;

  const rawSortOrder = query.sortOrder;
  const sortOrder: 'asc' | 'desc' =
    rawSortOrder != null && SORT_ORDER_SET.has(String(rawSortOrder) as any)
      ? (String(rawSortOrder) as 'asc' | 'desc')
      : 'desc';

  const rawSortBy = query.sortBy;
  const sortBy: TSortByField | undefined =
    rawSortBy != null && SORT_BY_SET.has(String(rawSortBy) as TSortByField)
      ? (String(rawSortBy) as TSortByField)
      : undefined;

  const minCost = parseNonNegativeNumber(query.minCost);
  const maxCost = parseNonNegativeNumber(query.maxCost);
  const minEvents = parseNonNegativeInt(query.minEvents);

  const rawSystems = parseStringArray(query.preferredSystems);
  const preferredSystems = rawSystems.filter((s) => GAME_SYSTEM_SET.has(s)) as TOrgIndexQuery['preferredSystems'];

  const initialFilters: TParsedOrgUrl['initialFilters'] = {};
  if (minCost !== undefined) initialFilters.minCost = minCost as any;
  if (maxCost !== undefined) initialFilters.maxCost = maxCost as any;
  if (minEvents !== undefined) initialFilters.minEvents = minEvents as any;
  if (preferredSystems?.length) initialFilters.preferredSystems = preferredSystems;

  return {
    initialQuery: {
      ...(q !== undefined ? { q } : {}),
      page,
      limit,
      sortOrder,
      ...(sortBy !== undefined ? { sortBy } : {}),
    },
    initialFilters,
  };
}

const { initialQuery, initialFilters } = parseQueryFromRoute(route.query);

const { loadCatalog } = useOrgFlow();
const { items, getItems, meta, page, limit, sortOrder, sortBy, q, filters, applyQuery, resetFilters } = await loadCatalog({
  initialQuery,
  initialFilters,
});

function isDeepEqualShallow(a: any, b: any): boolean {
  if (a === b) return true;
  if (!a || !b) return a === b;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    const va = a[k];
    const vb = b[k];
    if (Array.isArray(va) || Array.isArray(vb)) {
      if (!isDeepEqualShallow(va, vb)) return false;
      continue;
    }
    if (va !== vb) return false;
  }
  return true;
}

let syncingFromUrl = false;
watch(
  () => [q.value, page.value, limit.value, sortOrder.value, sortBy.value, filters.value] as const,
  ([nQ, nPage, nLimit, nSortOrder, nSortBy, nFilters], prev) => {
    if (syncingFromUrl) return;
    const next: Record<string, any> = {};
    if (nQ) next.q = nQ;
    if (nPage !== 1) next.page = nPage;
    if (nLimit !== 20) next.limit = nLimit;
    if (nSortOrder !== 'desc') next.sortOrder = nSortOrder;
    if (nSortBy) next.sortBy = nSortBy;
    const f = nFilters ?? {};
    if ((f as any).minCost !== undefined) next.minCost = (f as any).minCost;
    if ((f as any).maxCost !== undefined) next.maxCost = (f as any).maxCost;
    if ((f as any).minEvents !== undefined) next.minEvents = (f as any).minEvents;
    if ((f as any).preferredSystems?.length) next.preferredSystems = [...(f as any).preferredSystems];

    const current: Record<string, any> = {};
    const rq = route.query;
    for (const k of Object.keys(rq)) {
      current[k] = rq[k];
    }
    if (isDeepEqualShallow(next, current)) {
      return;
    }

    syncingFromUrl = true;
    const navigationResult = navigateTo({ query: next }, { replace: true });
    if (navigationResult instanceof Promise) {
      void navigationResult.finally(() => {
        syncingFromUrl = false;
      });
    } else {
      syncingFromUrl = false;
    }
  },
  { flush: 'post' }
);

watch(
  () => route.query,
  (nextQuery) => {
    if (syncingFromUrl) return;
    syncingFromUrl = true;
    try {
      const parsed = parseQueryFromRoute(nextQuery);
      void applyQuery({
        q: parsed.initialQuery.q,
        sortOrder: parsed.initialQuery.sortOrder,
        sortBy: parsed.initialQuery.sortBy,
        filters: parsed.initialFilters,
        page: parsed.initialQuery.page,
      }).finally(() => {
        syncingFromUrl = false;
      });
    } catch {
      syncingFromUrl = false;
    }
  },
  { flush: 'post' }
);
</script>

<template>
  <section class="GmPage">
    <OrgSearchFilter
      class="mx-auto w-full max-w-4xl"
      :apply-query="applyQuery"
      :current-q="q"
      :current-preferred-systems="(filters as any).preferredSystems"
    />

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
