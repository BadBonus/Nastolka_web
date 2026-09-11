import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

/**
 * Управляет индексом активной подсказки в списке.
 * Индекс всегда ограничен `min(items.length, maxSuggestions) - 1`.
 * `-1` означает «ничего не активно».
 */
export function useActiveSuggestion(
  items: MaybeRefOrGetter<readonly unknown[]>,
  maxSuggestions: MaybeRefOrGetter<number>,
  isEnabled: MaybeRefOrGetter<boolean>
) {
  const activeIndex = ref(-1);

  const visibleCount = computed(() => Math.min(toValue(items).length, toValue(maxSuggestions)));

  function reset() {
    activeIndex.value = -1;
  }

  function setActive(index: number) {
    if (index < 0 || index >= visibleCount.value) return;
    activeIndex.value = index;
  }

  function move(delta: number) {
    const count = visibleCount.value;

    if (!toValue(isEnabled) || count === 0) {
      reset();
      return;
    }

    if (activeIndex.value === -1) {
      activeIndex.value = delta > 0 ? 0 : count - 1;
      return;
    }

    // Циклим по кругу
    activeIndex.value = (activeIndex.value + delta + count) % count;
  }

  const moveNext = () => move(1);
  const movePrev = () => move(-1);

  // Меняются подсказки или контекст → сбрасываем выбор
  watch([() => toValue(items), () => toValue(isEnabled)], reset);

  // Список сузился → активный индекс может выпасть за границы
  watch(visibleCount, (count) => {
    if (activeIndex.value >= count) reset();
  });

  return {
    activeIndex,
    visibleCount,
    setActive,
    moveNext,
    movePrev,
    reset,
  };
}
