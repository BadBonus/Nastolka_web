import { ref, toValue, type MaybeRefOrGetter } from 'vue';

export function usePopoverState(containerRef: MaybeRefOrGetter<HTMLElement | null>) {
  const isOpen = ref(false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  /**
   * Закрывает попап только если фокус ушёл за пределы контейнера.
   */
  function handleFocusOut(event: FocusEvent) {
    const related = event.relatedTarget;
    const container = toValue(containerRef);
    if (related instanceof Node && container?.contains(related)) return;
    close();
  }

  return { isOpen, open, close, handleFocusOut };
}
