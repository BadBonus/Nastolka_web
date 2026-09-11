<script setup lang="ts">
import type { SuggestionItem } from './types.ts';
type TSearchFilterInputList = {
  suggestions: SuggestionItem[];
  maxSuggestions: number;
};

defineProps<TSearchFilterInputList>();
defineEmits<{
  (e: 'itemClick', item: SuggestionItem): void;
}>();
</script>
<template>
  <div class="SearchFilterInputList">
    <div v-if="!suggestions.length" class="p-2 text-sm text-gray-400">Нет совпадений</div>

    <ul v-else class="space-y-1 bg-mauve-800">
      <li v-for="item in suggestions.slice(0, maxSuggestions)" :key="item.id">
        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-1.5 text-left text-sm hover:bg-white/10"
          @click="$emit('itemClick', item)"
        >
          <span class="flex items-center gap-2">
            <span v-if="item.type === 'tag'" class="text-xs text-gray-400"> #tag </span>

            {{ item.label }}
          </span>

          <UBadge v-if="item.tagKey" :class="item.badgeColor || 'bg-neutral'">
            {{ item.tagKey }}
          </UBadge>
        </button>
      </li>
    </ul>
  </div>
</template>

<!--<style lang="scss"></style>-->
