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

watch(
  () => props.activeIndex,
  async (index) => {
    if (index < 0) return;
    await nextTick();
    const el = itemEls.value[index];
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
      el.focus({ preventScroll: true });
    }
  }
);
</script>

<template>
  <div class="SearchFilterInputList rounded border-2 border-solid bg-white text-black">
    <div v-if="!suggestions.length" class="p-2 text-sm">Нет совпадений</div>

    <ul v-else class="space-y-1 bg-white">
      <li v-for="(item, index) in suggestions.slice(0, maxSuggestions)" :key="item.id">
        <button
          :id="`search-suggestion-${index}`"
          :ref="(el: HTMLButtonElement | null, index: number) => setItemRef(el, index)"
          type="button"
          :aria-selected="index === activeIndex"
          class="hover:bg-background focus:bg-background flex w-full cursor-pointer items-center justify-between rounded px-3 py-1.5 text-left hover:text-white focus:text-white"
          :class="[item.type === 'entity' ? 'text-xs' : 'text-sm', { 'bg-background text-white': index === activeIndex }]"
          @mouseenter="emit('update:activeIndex', index)"
          @click="emit('itemClick', item)"
        >
          <span class="flex items-center gap-2">
            <span v-if="item.type === 'tag'" class="text-xs"> #tag </span>

            {{ item.label }}
          </span>

          <UBadge class="border-2 border-black" v-if="item.tagKey" :class="item.badgeColor || 'bg-neutral'">
            {{ item.tagKey }}
          </UBadge>
        </button>
      </li>
    </ul>
  </div>
</template>
