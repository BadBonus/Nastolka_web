<script setup lang="ts">
import type { SuggestionItem } from '@/components/globals/SearchFilterInput/types';
import type { FetchSuggestionsPayload } from '@/components/globals/SearchFilterInput/composables/useSuggestionsFetch';
import {
  tagsToSuggestions,
  valuesToEntitySuggestions,
  filterSuggestionsByQuery,
} from '@/components/globals/SearchFilterInput/utils';
import { ORG_SEARCH_TAGS, ORG_SEARCH_VALUES } from './config';
import { parseOrgSearchString, type TOrgSearchParsed } from './mappers';

defineOptions({
  name: 'OrgSearchFilter',
});

interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Поиск мастеров и фильтрация',
});

const emit = defineEmits<{
  (e: 'apply', value: TOrgSearchParsed): void;
}>();

const searchRaw = ref('');
const suggestionsList = ref<SuggestionItem[]>([]);

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
  emit('apply', parseOrgSearchString(query));
}
</script>

<template>
  <SearchFilterInput
    v-model="searchRaw"
    :placeholder="placeholder"
    :tags="ORG_SEARCH_TAGS"
    :suggestions="suggestionsList"
    @fetch-suggestions="handleFetchSuggestions"
    @search="handleSearch"
  />
</template>
