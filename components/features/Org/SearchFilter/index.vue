<script setup lang="ts">
import type { SuggestionItem } from '@/components/globals/SearchFilterInput/types';
import type { FetchSuggestionsPayload } from '@/components/globals/SearchFilterInput/composables/useSuggestionsFetch';
import {
  tagsToSuggestions,
  valuesToEntitySuggestions,
  filterSuggestionsByQuery,
} from '@/components/globals/SearchFilterInput/utils';
import { ORG_SEARCH_TAGS, ORG_SEARCH_VALUES } from './config';
import { parseOrgSearchString, formatOrgSearchString, type TOrgFiltersForFormat, type TOrgSearchParsed } from './mappers';
import type { TCatalogApplyQuery, TCatalogFiltersOf } from '@/composables/useCatalogItems';
import type { TOrgIndexQuery } from '@/composables/actions/useOrg';

defineOptions({
  name: 'OrgSearchFilter',
});

type TOrgFilters = TCatalogFiltersOf<TOrgIndexQuery>;

interface Props {
  placeholder?: string;
  currentQ?: string;
  currentPreferredSystems?: TOrgIndexQuery['preferredSystems'];
  currentMinCost?: number;
  currentMaxCost?: number;
  currentMinEvents?: number;
  currentSortOrder?: 'asc' | 'desc';
  applyQuery: (next: TCatalogApplyQuery<TOrgFilters>) => Promise<any>;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Поиск мастеров и фильтрация',
  currentQ: '',
  currentPreferredSystems: () => [],
});

const emit = defineEmits<{
  (e: 'update:sortOrder', value: 'asc' | 'desc'): void;
}>();

const sortOrderProxy = computed({
  get: () => props.currentSortOrder,
  set: (next: 'asc' | 'desc') => {
    emit('update:sortOrder', next);
    void props.applyQuery({ sortOrder: next, page: 1 });
  },
});

const searchRaw = ref(
  formatOrgSearchString({
    q: '' as string,
    filters: { preferredSystems: [] as TOrgIndexQuery['preferredSystems'] },
  })
);
const suggestionsList = ref<SuggestionItem[]>([]);

function currentFiltersFromProps(): TOrgFiltersForFormat {
  return {
    preferredSystems: props.currentPreferredSystems,
    minCost: props.currentMinCost,
    maxCost: props.currentMaxCost,
    minEvents: props.currentMinEvents,
  };
}

function systemsMatch(
  a: TOrgIndexQuery['preferredSystems'] | undefined,
  b: TOrgIndexQuery['preferredSystems'] | undefined
): boolean {
  const left = a ?? [];
  const right = b ?? [];
  return left.length === right.length && left.every((s, i) => s === right[i]);
}

function numericFiltersMatch(parsed: TOrgSearchParsed, filters: TOrgFiltersForFormat): boolean {
  return parsed.minCost === filters.minCost && parsed.maxCost === filters.maxCost && parsed.minEvents === filters.minEvents;
}

watch(
  () =>
    [
      props.currentQ,
      props.currentPreferredSystems,
      props.currentMinCost,
      props.currentMaxCost,
      props.currentMinEvents,
    ] as const,
  ([q, systems, minCost, maxCost, minEvents], prev) => {
    if (prev) {
      const [prevQ, prevSystems, prevMinCost, prevMaxCost, prevMinEvents] = prev;
      if (
        q === prevQ &&
        systemsMatch(systems, prevSystems) &&
        minCost === prevMinCost &&
        maxCost === prevMaxCost &&
        minEvents === prevMinEvents
      ) {
        return;
      }
    }

    const parsedInput = parseOrgSearchString(searchRaw.value ?? '');
    const filters = currentFiltersFromProps();
    if (
      (parsedInput.q ?? '') === (q ?? '') &&
      systemsMatch(parsedInput.preferredSystems, systems) &&
      numericFiltersMatch(parsedInput, filters)
    ) {
      return;
    }

    searchRaw.value = formatOrgSearchString({ q, filters });
  },
  { immediate: true, flush: 'post' }
);

function handleFetchSuggestions(payload: FetchSuggestionsPayload) {
  const { contextType, tagKey, queryWord } = payload;

  if (contextType === 'empty') {
    suggestionsList.value = tagsToSuggestions(ORG_SEARCH_TAGS);
    return;
  }

  if ((contextType === 'after_tag_key' || contextType === 'inside_entity_value') && tagKey) {
    const values = ORG_SEARCH_VALUES[tagKey] ?? [];
    const badgeColor = ORG_SEARCH_TAGS.find((t) => t.key === tagKey)?.badgeColor;
    const entities = valuesToEntitySuggestions(values, tagKey, badgeColor);
    suggestionsList.value = filterSuggestionsByQuery(entities, queryWord);
    return;
  }

  if (contextType === 'inside_word' && queryWord) {
    const matches: SuggestionItem[] = [];

    for (const [tKey, values] of Object.entries(ORG_SEARCH_VALUES)) {
      const badgeColor = ORG_SEARCH_TAGS.find((t) => t.key === tKey)?.badgeColor;
      const entities = valuesToEntitySuggestions(values, tKey, badgeColor);
      matches.push(...filterSuggestionsByQuery(entities, queryWord));
    }

    suggestionsList.value = matches;
    return;
  }

  suggestionsList.value = [];
}

function parsedToFilters(parsed: TOrgSearchParsed): TOrgFilters {
  const filters: TOrgFilters = {};
  if (parsed.preferredSystems) filters.preferredSystems = parsed.preferredSystems;
  if (parsed.minCost !== undefined) filters.minCost = parsed.minCost;
  if (parsed.maxCost !== undefined) filters.maxCost = parsed.maxCost;
  if (parsed.minEvents !== undefined) filters.minEvents = parsed.minEvents;
  return filters;
}

function handleSearch(query: string) {
  const parsed = parseOrgSearchString(query);
  void props.applyQuery({
    q: parsed.q,
    sortOrder: props.currentSortOrder,
    filters: parsedToFilters(parsed),
    page: 1,
  });
}
</script>

<template>
  <SearchFilterInput
    v-model="searchRaw"
    v-model:sort-order="sortOrderProxy"
    :placeholder="placeholder"
    :tags="ORG_SEARCH_TAGS"
    :suggestions="suggestionsList"
    @fetch-suggestions="handleFetchSuggestions"
    @search="handleSearch"
  />
</template>
