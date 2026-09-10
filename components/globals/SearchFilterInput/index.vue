<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

import {
  getCaretContext,
  insertEntity,
  insertTag,
  removeToken,
  toggleTokenNegation,
  type CaretContext,
  type CaretContextType,
  type Token,
} from './searchFilterParser';

export interface TagConfig {
  key: string;
  label: string;
  icon?: string;
  badgeColor?: string;
}

export interface SuggestionItem {
  id: string | number;
  label: string;
  value: string;
  tagKey?: string;
  badgeColor?: string;
  type?: 'tag' | 'entity';
}

export interface FetchSuggestionsPayload {
  contextType: CaretContextType;
  tagKey?: string;
  queryWord?: string;
  activeToken?: Token;
  isNegated?: boolean;
}

interface Props {
  modelValue?: string;
  tags?: TagConfig[];
  suggestions?: SuggestionItem[];
  maxSuggestions?: number;
  debounceMs?: number;
}

interface UInputInstance {
  inputRef?: HTMLInputElement | null;
  $el?: HTMLElement;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tags: () => [],
  suggestions: () => [],
  maxSuggestions: 10,
  debounceMs: 200,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
  (e: 'fetch-suggestions', payload: FetchSuggestionsPayload): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const containerRef = useTemplateRef<HTMLElement>('containerRef');

const uInputRef = useTemplateRef<UInputInstance>('uInputRef');

const isPopoverOpen = ref(false);

const currentContext = ref<CaretContext>({ type: 'empty' });

let suggestionsTimer: ReturnType<typeof setTimeout> | null = null;

let lastSuggestionsKey = '';

const nativeInput = computed<HTMLInputElement | null>(() => {
  const instance = uInputRef.value;

  if (!instance) {
    return null;
  }

  if (instance.inputRef instanceof HTMLInputElement) {
    return instance.inputRef;
  }

  return instance.$el?.querySelector('input') ?? null;
});

function clearSuggestionsTimer() {
  if (suggestionsTimer !== null) {
    clearTimeout(suggestionsTimer);
    suggestionsTimer = null;
  }
}

function buildSuggestionsPayload(context: CaretContext): FetchSuggestionsPayload {
  return {
    contextType: context.type,
    tagKey: context.tagKey,
    queryWord: context.queryWord,
    activeToken: context.activeToken,
    isNegated: context.isNegated,
  };
}

function buildSuggestionsKey(context: CaretContext): string {
  return JSON.stringify({
    type: context.type,
    tagKey: context.tagKey ?? null,
    queryWord: context.queryWord ?? null,
    isNegated: context.isNegated ?? false,
  });
}

function scheduleSuggestions(context: CaretContext, force = false) {
  const suggestionsKey = buildSuggestionsKey(context);

  if (!force && suggestionsKey === lastSuggestionsKey) {
    return;
  }

  lastSuggestionsKey = suggestionsKey;

  clearSuggestionsTimer();

  suggestionsTimer = setTimeout(() => {
    suggestionsTimer = null;

    emit('fetch-suggestions', buildSuggestionsPayload(context));
  }, props.debounceMs);
}

function syncCaretContext(options?: { fetchSuggestions?: boolean; forceFetch?: boolean }) {
  const el = nativeInput.value;

  if (!el || document.activeElement !== el) {
    return;
  }

  const caretPos = el.selectionStart ?? 0;

  const context = getCaretContext(props.modelValue, caretPos);

  currentContext.value = context;

  if (options?.fetchSuggestions) {
    scheduleSuggestions(context, options.forceFetch ?? false);
  }
}

function openSuggestions() {
  isPopoverOpen.value = true;
}

function closeSuggestions() {
  isPopoverOpen.value = false;
  clearSuggestionsTimer();
}

function handleInput() {
  openSuggestions();

  nextTick(() => {
    syncCaretContext({
      fetchSuggestions: true,
    });
  });
}

function handleFocus() {
  openSuggestions();

  syncCaretContext({
    fetchSuggestions: true,
    forceFetch: true,
  });
}

function handleSelectionChange() {
  const el = nativeInput.value;

  if (!el || document.activeElement !== el) {
    return;
  }

  syncCaretContext({
    fetchSuggestions: true,
  });
}

function getCaretPosition(): number {
  return nativeInput.value?.selectionStart ?? props.modelValue.length;
}

function restoreCaretAndSync(caretPos: number) {
  nextTick(() => {
    const el = nativeInput.value;

    if (!el) {
      return;
    }

    el.focus();

    const safeCaretPos = Math.min(Math.max(caretPos, 0), el.value.length);

    el.setSelectionRange(safeCaretPos, safeCaretPos);

    syncCaretContext({
      fetchSuggestions: true,
      forceFetch: true,
    });
  });
}

function handleSelectTag(tagKey: string) {
  const caretPos = getCaretPosition();

  const { newString, newCaretPos } = insertTag(props.modelValue, caretPos, tagKey);

  model.value = newString;

  restoreCaretAndSync(newCaretPos);
}

function handleSelectEntity(entityValue: string, tagKey?: string) {
  const caretPos = getCaretPosition();

  const context = currentContext.value;

  const resolvedTagKey = tagKey ?? context.tagKey;

  const { newString, newCaretPos } = insertEntity(props.modelValue, caretPos, entityValue, {
    tagKey: resolvedTagKey,
    isNegated: context.isNegated ?? false,
  });

  model.value = newString;

  /*
   * Parser уже вернул позицию ПОСЛЕ
   * автоматически добавленного пробела.
   */
  restoreCaretAndSync(newCaretPos);
}

function handleToggleTokenNegation() {
  const context = currentContext.value;

  if (context.type !== 'on_token' || !context.activeToken) {
    return;
  }

  const { newString, newCaretPos } = toggleTokenNegation(props.modelValue, context.activeToken);

  model.value = newString;

  restoreCaretAndSync(newCaretPos);
}

function handleRemoveToken() {
  const context = currentContext.value;

  if (context.type !== 'on_token' || !context.activeToken) {
    return;
  }

  const { newString, newCaretPos } = removeToken(props.modelValue, context.activeToken);

  model.value = newString;

  restoreCaretAndSync(newCaretPos);
}

function handleItemClick(item: SuggestionItem) {
  if (item.type === 'tag') {
    handleSelectTag(item.value);
    return;
  }

  handleSelectEntity(item.value, item.tagKey);
}

function handleInputClear() {
  clearSuggestionsTimer();

  lastSuggestionsKey = '';

  currentContext.value = {
    type: 'empty',
  };

  model.value = '';

  closeSuggestions();
}

function handleSearchSubmit() {
  clearSuggestionsTimer();

  emit('search', props.modelValue);

  closeSuggestions();
}

function handleFocusOut(event: FocusEvent) {
  const relatedTarget = event.relatedTarget;

  if (relatedTarget instanceof Node && containerRef.value?.contains(relatedTarget)) {
    return;
  }

  closeSuggestions();
}

onMounted(() => {
  document.addEventListener('selectionchange', handleSelectionChange);
});

onUnmounted(() => {
  clearSuggestionsTimer();

  document.removeEventListener('selectionchange', handleSelectionChange);
});

defineExpose({
  nativeInput,
  isPopoverOpen,
  currentContext,

  updateCaretAndContext: () =>
    syncCaretContext({
      fetchSuggestions: true,
      forceFetch: true,
    }),
});
</script>

<template>
  <div ref="containerRef" class="relative w-full" @focusout="handleFocusOut">
    <UInput
      ref="uInputRef"
      v-model="model"
      icon="i-heroicons-magnifying-glass"
      clearable
      class="w-full"
      @clear="handleInputClear"
      @focus="handleFocus"
      @input="handleInput"
      @keydown.enter="handleSearchSubmit"
    />

    <div
      v-show="isPopoverOpen"
      class="absolute top-full left-0 z-50 mt-1 max-h-60 w-full min-w-[300px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      @mousedown.prevent
    >
      <template v-if="currentContext.type === 'on_token' && currentContext.activeToken">
        <div class="space-y-1 p-1">
          <div class="border-b border-gray-100 px-2 py-1 font-mono text-xs text-gray-400 dark:border-gray-800">
            {{ currentContext.activeToken.raw }}
          </div>

          <button
            type="button"
            class="flex w-full items-center justify-between rounded px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="handleToggleTokenNegation"
          >
            <span>
              {{ currentContext.activeToken.type === 'negated_filter' ? 'Включить тег' : 'Исключить тег' }}
            </span>

            <UBadge size="xs" color="warning">
              {{ currentContext.activeToken.type === 'negated_filter' ? '+include' : '-exclude' }}
            </UBadge>
          </button>

          <button
            type="button"
            class="flex w-full items-center justify-between rounded px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            @click="handleRemoveToken"
          >
            <span>Удалить тег</span>

            <UBadge size="xs" color="error"> delete </UBadge>
          </button>
        </div>
      </template>

      <slot v-else name="suggestions" :context="currentContext" :suggestions="props.suggestions">
        <div v-if="!props.suggestions.length" class="p-2 text-sm text-gray-400">Нет совпадений</div>

        <ul v-else class="space-y-1">
          <li v-for="item in props.suggestions.slice(0, props.maxSuggestions)" :key="item.id">
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between rounded px-3 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="handleItemClick(item)"
            >
              <span class="flex items-center gap-2">
                <span v-if="item.type === 'tag'" class="font-mono text-xs text-gray-400"> #tag </span>

                {{ item.label }}
              </span>

              <UBadge v-if="item.tagKey" size="xs" :color="item.badgeColor || 'neutral'">
                {{ item.tagKey }}
              </UBadge>
            </button>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
