import { toValue, type MaybeRefOrGetter } from 'vue';
import type { CaretContext, CaretContextType } from '../searchFilterParser';
import type { Token } from '../types';

export interface FetchSuggestionsPayload {
  contextType: CaretContextType;
  tagKey?: string;
  queryWord?: string;
  activeToken?: Token;
  isNegated?: boolean;
}

export function useSuggestionsFetch(
  emitFetch: (payload: FetchSuggestionsPayload) => void,
  debounceMs: MaybeRefOrGetter<number>
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastKey = '';

  function buildKey(context: CaretContext): string {
    return [context.type, context.tagKey ?? '', context.queryWord ?? '', context.isNegated ? 1 : 0].join('|');
  }

  function buildPayload(context: CaretContext): FetchSuggestionsPayload {
    return {
      contextType: context.type,
      tagKey: context.tagKey,
      queryWord: context.queryWord,
      activeToken: context.activeToken,
      isNegated: context.isNegated,
    };
  }

  function cancel() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function schedule(context: CaretContext, force = false) {
    const key = buildKey(context);
    if (!force && key === lastKey) return;
    lastKey = key;

    cancel();
    timer = setTimeout(() => {
      timer = null;
      emitFetch(buildPayload(context));
    }, toValue(debounceMs));
  }

  function reset() {
    cancel();
    lastKey = '';
  }

  return { schedule, cancel, reset };
}
