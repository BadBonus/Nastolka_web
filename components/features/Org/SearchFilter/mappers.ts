import type { ORG } from '#openApi';
import { GameSystem } from '#openApi/enums';
import { ETokenTypes } from '@/components/globals/SearchFilterInput/types';
import { parseSearchString } from '@/components/globals/SearchFilterInput/searchFilterParser';

type TOrgIndexQuery = ORG['INDEX']['GET']['query'];

export type TOrgSearchParsed = {
  q: string;
  preferredSystems?: TOrgIndexQuery['preferredSystems'];
  minCost?: number;
  maxCost?: number;
  minEvents?: number;
};

export type TOrgFiltersForFormat = {
  preferredSystems?: TOrgIndexQuery['preferredSystems'];
  minCost?: number;
  maxCost?: number;
  minEvents?: number;
};

const GAME_SYSTEM_SET = new Set<string>(GameSystem);

function parseNonNegativeNumber(value: string): number | undefined {
  if (!value || !/^\d+(\.\d+)?$/.test(value)) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  return n;
}

function parseNonNegativeInt(value: string): number | undefined {
  const n = parseNonNegativeNumber(value);
  if (n === undefined || !Number.isInteger(n)) return undefined;
  return n;
}

/**
 * Парсит строку SearchFilterInput в параметры GET /org.
 * NegatedFilter и невалидные значения игнорируются.
 */
export function parseOrgSearchString(input: string): TOrgSearchParsed {
  const tokens = parseSearchString(input);
  const textParts: string[] = [];
  const systems = new Set<string>();
  let minCost: number | undefined;
  let maxCost: number | undefined;
  let minEvents: number | undefined;

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
      continue;
    }

    if (key === 'minCost') {
      const parsed = parseNonNegativeNumber(value);
      if (parsed !== undefined) minCost = parsed;
      continue;
    }

    if (key === 'maxCost') {
      const parsed = parseNonNegativeNumber(value);
      if (parsed !== undefined) maxCost = parsed;
      continue;
    }

    if (key === 'minEvents') {
      const parsed = parseNonNegativeInt(value);
      if (parsed !== undefined) minEvents = parsed;
    }
  }

  return {
    q: textParts.join(' '),
    ...(systems.size ? { preferredSystems: [...systems] as TOrgIndexQuery['preferredSystems'] } : {}),
    ...(minCost !== undefined ? { minCost } : {}),
    ...(maxCost !== undefined ? { maxCost } : {}),
    ...(minEvents !== undefined ? { minEvents } : {}),
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
  if (filters.minCost !== undefined) {
    parts.push(`minCost:${filters.minCost}`);
  }
  if (filters.maxCost !== undefined) {
    parts.push(`maxCost:${filters.maxCost}`);
  }
  if (filters.minEvents !== undefined) {
    parts.push(`minEvents:${filters.minEvents}`);
  }
  return parts.join(' ');
}
