import { onMounted, onUnmounted, ref, toValue, type MaybeRefOrGetter } from 'vue';
import { getCaretContext, type CaretContext } from '../searchFilterParser';

export type ContextChangeHandler = (context: CaretContext, force: boolean) => void;

export function useCaretContext(
  inputRef: MaybeRefOrGetter<HTMLInputElement | null>,
  modelValue: MaybeRefOrGetter<string>,
  onContextChange?: ContextChangeHandler
) {
  const currentContext = ref<CaretContext>({ type: 'empty' });

  function isFocused(): boolean {
    const el = toValue(inputRef);
    return !!el && document.activeElement === el;
  }

  function getCaretPosition(): number {
    const el = toValue(inputRef);
    return el?.selectionStart ?? toValue(modelValue).length;
  }

  /**
   * Пересчитывает контекст по текущей каретке.
   * Возвращает null, если инпут не в фокусе (аналогично старому поведению).
   */
  function sync(options: { force?: boolean } = {}): CaretContext | null {
    const el = toValue(inputRef);
    if (!el || document.activeElement !== el) return null;

    const caretPos = el.selectionStart ?? 0;
    const context = getCaretContext(toValue(modelValue), caretPos);

    currentContext.value = context;
    onContextChange?.(context, options.force ?? false);

    return context;
  }

  function reset() {
    currentContext.value = { type: 'empty' };
  }

  function handleSelectionChange() {
    // Программные setSelectionRange тоже сюда попадут — это ок,
    // schedule() дедуплицирует по ключу.
    sync();
  }

  onMounted(() => document.addEventListener('selectionchange', handleSelectionChange));
  onUnmounted(() => document.removeEventListener('selectionchange', handleSelectionChange));

  return {
    currentContext,
    getCaretPosition,
    sync,
    reset,
  };
}
