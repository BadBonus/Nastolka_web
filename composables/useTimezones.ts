export interface Timezone {
  name: string;      // IANA-имя, например, "Pacific/Rarotonga"
  offset: string;    // Отформатированное смещение, например, "GMT-10:00"
  longName: string;  // Полное имя, например, "Cook Islands Standard Time"
  label: string;     // Готовая строка для отображения в UI
}

/**
 * Возвращает отсортированный список часовых поясов в формате (GMT-10:00) Имя Пояса.
 */
export function useTimezones() {
  /**
   * Получает подробную информацию для одного часового пояса.
   * @param timeZone - IANA-имя часового пояса
   */
  const getTimezoneData = (timeZone: string): Timezone | null => {
    try {
      const date = new Date();

      const longNameFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'long',
      });
      const longName = longNameFormatter.formatToParts(date).find(p => p.type === 'timeZoneName')?.value;

      const offsetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'longOffset',
      });
      const offsetRaw = offsetFormatter.formatToParts(date).find(p => p.type === 'timeZoneName')?.value;

      if (!longName || !offsetRaw) {
        return null;
      }

      const offset = offsetRaw.includes(':') ? offsetRaw : `${offsetRaw}:00`;

      return {
        name: timeZone,
        offset: offset.replace('GMT', 'UTC'),
        longName: longName,
        label: `(${offset}) ${longName}`,
      };
    } catch (e) {
      return null;
    }
  };

  const timezones = computed<Timezone[]>(() => {
    const allTimezoneNames = Intl.supportedValuesOf('timeZone');

    return allTimezoneNames
      .map(name => getTimezoneData(name))
      .filter((tz): tz is Timezone => tz !== null)
      .sort((a, b) => {
        const offsetCompare = a.offset.localeCompare(b.offset);
        if (offsetCompare !== 0) return offsetCompare;
        return a.longName.localeCompare(b.longName);
      });
  });

  return {timezones};
}