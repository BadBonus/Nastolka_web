<script setup lang="ts">
import type { SuggestionItem, TagConfig } from './types';
import SuggestionActions from './SuggestionActions.vue';
import List from './List.vue';
import { useCaretContext } from './composables/useCaretContext';
import { useSuggestionsFetch, type FetchSuggestionsPayload } from './composables/useSuggestionsFetch';
import { usePopoverState } from './composables/usePopoverState';
import { useInputActions } from './composables/useInputActions';

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

const nativeInput = computed<HTMLInputElement | null>(() => {
  const instance = uInputRef.value;
  if (!instance) return null;
  if (instance.inputRef instanceof HTMLInputElement) return instance.inputRef;
  return instance.$el?.querySelector('input') ?? null;
});

const { isOpen: isPopoverOpen, open: openPopover, close: closePopover, handleFocusOut } = usePopoverState(containerRef);

const fetch = useSuggestionsFetch(
  (payload) => emit('fetch-suggestions', payload),
  () => props.debounceMs
);

const {
  currentContext,
  sync: syncCaret,
  reset: resetCaret,
} = useCaretContext(
  nativeInput,
  () => props.modelValue,
  (context, force) => fetch.schedule(context, force)
);

const { selectTag, selectEntity, toggleNegation, removeActiveToken } = useInputActions({
  modelValue: model,
  inputRef: nativeInput,
  currentContext,
  onAfterRestore: () => syncCaret({ force: true }),
});

function handleInput() {
  openPopover();
  nextTick(() => syncCaret());
}

function handleFocus() {
  openPopover();
  syncCaret({ force: true });
}

function handleItemClick(item: SuggestionItem) {
  if (item.type === 'tag') {
    selectTag(item.value);
    return;
  }
  selectEntity(item.value, item.tagKey);
}

function handleInputClear() {
  fetch.reset();
  resetCaret();
  model.value = '';
  closePopover();
}

function handleSearchSubmit() {
  fetch.cancel();
  emit('search', props.modelValue);
  closePopover();
}

defineExpose({
  nativeInput,
  isPopoverOpen,
  currentContext,
  updateCaretAndContext: () => syncCaret({ force: true }),
});
</script>

<template>
  <div ref="containerRef" class="relative w-full" @focusout="handleFocusOut">
    <UInput
      ref="uInputRef"
      v-model="model"
      clearable
      class="w-full"
      @clear="handleInputClear"
      @focus="handleFocus"
      @input="handleInput"
      @keydown.enter="handleSearchSubmit"
      :ui="{ trailing: 'pe-1' }"
    >
      <template v-if="model.length" #trailing>
        <UButton variant="link" aria-label="Clear input" @click="handleInputClear" class="text-primary"> X </UButton>
      </template>
    </UInput>

    <div
      v-show="isPopoverOpen"
      class="absolute top-full left-0 z-50 mt-1 max-h-60 w-full min-w-7 overflow-y-auto rounded-md border shadow-lg"
      @mousedown.prevent
    >
      <SuggestionActions
        v-if="currentContext.type === 'on_token' && currentContext.activeToken"
        :activeToken="currentContext.activeToken"
        @toggleTokenNegation="toggleNegation"
        @removeToken="removeActiveToken"
        class="bg-secondary space-y-1 p-1"
      />

      <List v-else :suggestions="props.suggestions" :maxSuggestions="props.maxSuggestions" @itemClick="handleItemClick" />
    </div>
  </div>
</template>
