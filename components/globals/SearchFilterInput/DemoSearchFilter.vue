<!-- DemoSearchFilter.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import SearchFilterInput, { type FetchSuggestionsPayload, type SuggestionItem, type TagConfig } from './index.vue';

const searchQuery = ref('image category:"manga"');
const isLoading = ref(false);
const suggestionsList = ref<SuggestionItem[]>([]);

const availableTags: TagConfig[] = [
  { key: 'gameSystem', label: 'Игровая система', badgeColor: 'blue' },
  { key: 'category', label: 'Категория', badgeColor: 'green' },
  { key: 'language', label: 'Язык', badgeColor: 'purple' },
  { key: 'parody', label: 'Пародия', badgeColor: 'amber' },
];

const mockEntitiesDatabase: Record<string, string[]> = {
  gameSystem: ['dnd', 'pathfinder', 'cyberpunk', 'world_of_darkness', 'savage_worlds'],
  category: ['manga', 'anime', 'artbook', 'doujinshi', 'comics'],
  language: ['chinese', 'english', 'japanese', 'russian', 'korean'],
  parody: ['the idolmaster', 'fate stay night', 'touhou project', 'kantai collection'],
};

function handleFetchSuggestions(payload: FetchSuggestionsPayload) {
  isLoading.value = true;

  setTimeout(() => {
    const { contextType, tagKey, queryWord } = payload;

    if (contextType === 'empty') {
      suggestionsList.value = availableTags.map((tag) => ({
        id: tag.key,
        label: tag.label,
        value: tag.key,
        type: 'tag',
      }));
    } else if (contextType === 'after_tag_key' && tagKey) {
      const entities = mockEntitiesDatabase[tagKey] || [];
      suggestionsList.value = entities.map((item) => ({
        id: item,
        label: item,
        value: item,
        tagKey,
        type: 'entity',
        badgeColor: availableTags.find((t) => t.key === tagKey)?.badgeColor,
      }));
    } else if (contextType === 'inside_entity_value' && tagKey) {
      const entities = mockEntitiesDatabase[tagKey] || [];
      const search = (queryWord || '').toLowerCase();
      const filtered = entities.filter((e) => e.toLowerCase().includes(search));

      suggestionsList.value = filtered.map((item) => ({
        id: item,
        label: item,
        value: item,
        tagKey,
        type: 'entity',
        badgeColor: availableTags.find((t) => t.key === tagKey)?.badgeColor,
      }));
    } else if (contextType === 'inside_word' && queryWord) {
      const search = queryWord.toLowerCase();
      const matches: SuggestionItem[] = [];

      Object.entries(mockEntitiesDatabase).forEach(([tKey, items]) => {
        items.forEach((item) => {
          if (item.toLowerCase().includes(search)) {
            matches.push({
              id: `${tKey}-${item}`,
              label: item,
              value: item,
              tagKey: tKey,
              type: 'entity',
              badgeColor: availableTags.find((t) => t.key === tKey)?.badgeColor,
            });
          }
        });
      });

      suggestionsList.value = matches;
    } else {
      suggestionsList.value = [];
    }

    isLoading.value = false;
  }, 50);
}

function handleSearch(query: string) {
  const encodedQuery = encodeURIComponent(query);
  console.log('Выполнен поиск с URL query:', `/search?q=${encodedQuery}`);
}
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-4 p-8">
    <div class="font-mono text-sm text-gray-500">Текущее значение v-model: {{ searchQuery }}</div>

    <SearchFilterInput
      v-model="searchQuery"
      :tags="availableTags"
      :suggestions="suggestionsList"
      :loading="isLoading"
      @fetch-suggestions="handleFetchSuggestions"
      @search="handleSearch"
    />
  </div>
</template>
