<script setup lang="ts">
import type { SuggestionItem } from './types.ts';

type TSearchFilterInputList = {
  suggestions: SuggestionItem[];
  maxSuggestions: number;
  activeIndex: number;
};

const props = defineProps<TSearchFilterInputList>();

const emit = defineEmits<{
  (e: 'itemClick', item: SuggestionItem): void;
  (e: 'update:activeIndex', index: number): void;
}>();

const itemEls = ref<HTMLButtonElement[]>([]);

function setItemRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLButtonElement) {
    itemEls.value[index] = el;
  }
}

// Активная опция всегда должна быть видна в скролл-контейнере попапа.
watch(
  () => props.activeIndex,
  async (index) => {
    if (index < 0) return;
    await nextTick();
    itemEls.value[index]?.scrollIntoView({ block: 'nearest' });
  }
);
</script>

<template>
  <div class="SearchFilterInputList rounded border-2 border-solid bg-white text-black">
    <div v-if="!suggestions.length" class="p-2 text-sm">Нет совпадений</div>

    <ul v-else class="space-y-1 bg-mauve-800">
      <li v-for="(item, index) in suggestions.slice(0, maxSuggestions)" :key="item.id">
        <button
          :id="`search-suggestion-${index}`"
          :ref="(el: HTMLButtonElement | null, index: number) => setItemRef(el, index)"
          type="button"
          :aria-selected="index === activeIndex"
          class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-1.5 text-left text-sm hover:bg-white/10"
          :class="{ 'bg-white/10': index === activeIndex }"
          @mouseenter="emit('update:activeIndex', index)"
          @click="emit('itemClick', item)"
        >
          <span class="flex items-center gap-2">
            <span v-if="item.type === 'tag'" class="text-xs"> #tag </span>

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
