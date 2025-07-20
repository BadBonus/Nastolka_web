export function useFormattedDate(dateString: MaybeRef<string | Date>) {
  const dateObj = computed(() => {
    const value = unref(dateString);
    if (!value) return null;

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  });

  return {
    date: computed(() => dateObj.value?.toLocaleDateString() ?? null),
    time: computed(() => dateObj.value?.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) ?? null),
  };
}