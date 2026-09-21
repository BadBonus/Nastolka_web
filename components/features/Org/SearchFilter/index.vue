<script setup lang="ts">
import type { SuggestionItem } from '@/components/globals/SearchFilterInput/types';
import type { FetchSuggestionsPayload } from '@/components/globals/SearchFilterInput/composables/useSuggestionsFetch';
import {
  tagsToSuggestions,
  valuesToEntitySuggestions,
  filterSuggestionsByQuery,
} from '@/components/globals/SearchFilterInput/utils';
import { ORG_SEARCH_TAGS, ORG_SEARCH_VALUES } from './config';
import { parseOrgSearchString, formatOrgSearchString } from './mappers';
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

watch(
  () => [props.currentQ, props.currentPreferredSystems] as const,
  ([q, systems], prev) => {
    const [prevQ, prevSystems] = (prev ?? ['', []]) as [string, TOrgIndexQuery['preferredSystems'] | undefined];
    const systemsArr = systems ?? [];
    const prevArr = prevSystems ?? [];
    if (q === prevQ && systemsArr.length === prevArr.length && systemsArr.every((s, i) => s === prevArr[i])) {
      return;
    }
    const parsedInput = parseOrgSearchString(searchRaw.value ?? '');
    const inputSystems = parsedInput.preferredSystems ?? [];
    const systemsMatch = inputSystems.length === systemsArr.length && inputSystems.every((s, i) => s === systemsArr[i]);
    if ((parsedInput.q ?? '') === (q ?? '') && systemsMatch) {
      return;
    }
    searchRaw.value = formatOrgSearchString({ q, filters: { preferredSystems: systems } });
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

function handleSearch(query: string) {
  const parsed = parseOrgSearchString(query);
  void props.applyQuery({
    q: parsed.q,
    sortOrder: props.currentSortOrder,
    filters: parsed.preferredSystems ? { preferredSystems: parsed.preferredSystems } : ({} as any),
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
