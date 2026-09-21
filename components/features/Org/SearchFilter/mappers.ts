import type { ORG } from '#openApi';
import { GameSystem } from '#openApi/enums';
import { ETokenTypes } from '@/components/globals/SearchFilterInput/types';
import { parseSearchString } from '@/components/globals/SearchFilterInput/searchFilterParser';

type TOrgIndexQuery = ORG['INDEX']['GET']['query'];

export type TOrgSearchParsed = {
  q: string;
  preferredSystems?: TOrgIndexQuery['preferredSystems'];
};

export type TOrgFiltersForFormat = {
  preferredSystems?: TOrgIndexQuery['preferredSystems'];
};

const GAME_SYSTEM_SET = new Set<string>(GameSystem);

/**
 * Парсит строку SearchFilterInput в параметры GET /org.
 * NegatedFilter и невалидные значения игнорируются.
 */
export function parseOrgSearchString(input: string): TOrgSearchParsed {
  const tokens = parseSearchString(input);
  const textParts: string[] = [];
  const systems = new Set<string>();

  for (const token of tokens) {
    if (token.type === ETokenTypes.Text) {
      textParts.push(token.raw);
      continue;
    }

    if (token.type !== ETokenTypes.Filter) continue;

    const key = token.key;
    const value = token.value ?? '';

    if (key === 'preferredSystems' && GAME_SYSTEM_SET.has(value)) {
      systems.add(value);
    }
  }

  return {
    q: textParts.join(' '),
    ...(systems.size ? { preferredSystems: [...systems] as TOrgIndexQuery['preferredSystems'] } : {}),
  };
}

function escapeFilterValue(value: string): string {
  if (/[\s":,\\]/.test(value)) {
    return `"${value.replace(/(["\\])/g, '\\$1')}"`;
  }
  return value;
}

/**
 * Форматирует q + набор фильтров обратно в строку SearchFilterInput.
 * Обратная к parseOrgSearchString функция.
 */
export function formatOrgSearchString(params: { q?: string; filters?: TOrgFiltersForFormat }): string {
  const parts: string[] = [];
  if (params.q?.trim()) {
    parts.push(params.q.trim());
  }
  const filters = params.filters ?? {};
  if (filters.preferredSystems?.length) {
    for (const sys of filters.preferredSystems) {
      parts.push(`preferredSystems:${escapeFilterValue(sys)}`);
    }
  }
  return parts.join(' ');
}
