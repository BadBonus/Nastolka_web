import {formatUnderscoreToSpace} from '@/utils/transformers/formatUnderscoreToSpace';
import type {SuggestionItem, TagConfig} from './types';

export function tagsToSuggestions(tags: TagConfig[]): SuggestionItem[] {
  return tags.map((tag) => ({
    id: tag.key,
    label: tag.label,
    value: tag.key,
    type: 'tag',
    badgeColor: tag.badgeColor,
  }));
}

export function valuesToEntitySuggestions(
  values: readonly string[],
  tagKey: string,
  badgeColor?: string
): SuggestionItem[] {
  return values.map((value) => ({
    id: `${tagKey}-${value}`,
    label: formatUnderscoreToSpace(value),
    value,
    tagKey,
    type: 'entity',
    badgeColor,
  }));
}

export function filterSuggestionsByQuery(items: SuggestionItem[], queryWord?: string): SuggestionItem[] {
  const search = (queryWord ?? '').trim().toLowerCase();
  if (!search) return items;
  return items.filter((item) => item.label.toLowerCase().includes(search) || item.value.toLowerCase().includes(search));
}
