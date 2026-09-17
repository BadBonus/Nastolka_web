/**
 * Преобразует enum-код в читаемый лейбл: подчёркивания → пробелы.
 *
 * @example
 * formatEnumLabel('DUNGEONS_AND_DRAGONS_5E') // → 'DUNGEONS AND DRAGONS 5E'
 */
export function formatEnumLabel(value: string): string {
  return value.replaceAll('_', ' ');
}
