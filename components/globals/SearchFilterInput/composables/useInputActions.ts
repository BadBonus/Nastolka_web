import { nextTick, toValue, type MaybeRefOrGetter, type Ref } from 'vue';
import { insertEntity, insertTag, removeToken, toggleTokenNegation, type CaretContext } from '../searchFilterParser';

export interface UseInputActionsOptions {
  modelValue: Ref<string>;
  inputRef: MaybeRefOrGetter<HTMLInputElement | null>;
  currentContext: Ref<CaretContext>;
  /** Вызывается после того, как каретка восстановлена в DOM. */
  onAfterRestore: () => void;
}

export function useInputActions(options: UseInputActionsOptions) {
  const { modelValue, inputRef, currentContext, onAfterRestore } = options;

  function getCaretPosition(): number {
    return toValue(inputRef)?.selectionStart ?? modelValue.value.length;
  }

  async function restoreCaretAndSync(caretPos: number) {
    await nextTick();

    const el = toValue(inputRef);
    if (!el) return;

    el.focus();
    const safe = Math.min(Math.max(caretPos, 0), el.value.length);
    el.setSelectionRange(safe, safe);

    onAfterRestore();
  }

  async function selectTag(tagKey: string) {
    const { newString, newCaretPos } = insertTag(modelValue.value, getCaretPosition(), tagKey);
    modelValue.value = newString;
    await restoreCaretAndSync(newCaretPos);
  }

  async function selectEntity(entityValue: string, tagKey?: string) {
    const context = currentContext.value;
    const resolvedTagKey = tagKey ?? context.tagKey;

    const { newString, newCaretPos } = insertEntity(modelValue.value, getCaretPosition(), entityValue, {
      tagKey: resolvedTagKey,
      isNegated: context.isNegated ?? false,
    });
    modelValue.value = newString;
    await restoreCaretAndSync(newCaretPos);
  }

  async function toggleNegation() {
    const context = currentContext.value;
    if (context.type !== 'on_token' || !context.activeToken) return;

    const { newString, newCaretPos } = toggleTokenNegation(modelValue.value, context.activeToken);
    modelValue.value = newString;
    await restoreCaretAndSync(newCaretPos);
  }

  async function removeActiveToken() {
    const context = currentContext.value;
    if (context.type !== 'on_token' || !context.activeToken) return;

    const { newString, newCaretPos } = removeToken(modelValue.value, context.activeToken);
    modelValue.value = newString;
    await restoreCaretAndSync(newCaretPos);
  }

  return {
    getCaretPosition,
    selectTag,
    selectEntity,
    toggleNegation,
    removeActiveToken,
  };
}
