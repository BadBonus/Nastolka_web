import { describe, expect, it } from 'vitest';
import { formatOrgSearchString, parseOrgSearchString } from './mappers';

describe('parseOrgSearchString', () => {
  it('парсит пресеты minCost, maxCost и minEvents', () => {
    expect(parseOrgSearchString('minCost:5 maxCost:40 minEvents:5')).toEqual({
      q: '',
      minCost: 5,
      maxCost: 40,
      minEvents: 5,
    });
  });

  it('принимает произвольное неотрицательное число, не только пресет', () => {
    expect(parseOrgSearchString('minCost:10 maxCost:99 minEvents:12')).toEqual({
      q: '',
      minCost: 10,
      maxCost: 99,
      minEvents: 12,
    });
  });

  it('принимает дробный cost в кавычках и без', () => {
    expect(parseOrgSearchString('minCost:"7.5" maxCost:12.25')).toEqual({
      q: '',
      minCost: 7.5,
      maxCost: 12.25,
    });
  });

  it('игнорирует нецелое minEvents', () => {
    expect(parseOrgSearchString('minEvents:5.5')).toEqual({ q: '' });
  });

  it('игнорирует negated и отрицательные числовые фильтры', () => {
    expect(parseOrgSearchString('-minCost:5 maxCost:-1 minEvents:-3')).toEqual({ q: '' });
  });

  it('для скалярных ключей побеждает последнее валидное значение', () => {
    expect(parseOrgSearchString('minCost:5 minCost:20 minEvents:1 minEvents:8')).toEqual({
      q: '',
      minCost: 20,
      minEvents: 8,
    });
  });

  it('сохраняет свободный текст и preferredSystems вместе с числами', () => {
    expect(parseOrgSearchString('alice preferredSystems:DUNGEONS_AND_DRAGONS_5E minCost:5')).toEqual({
      q: 'alice',
      preferredSystems: ['DUNGEONS_AND_DRAGONS_5E'],
      minCost: 5,
    });
  });
});

describe('formatOrgSearchString', () => {
  it('форматирует числовые фильтры без кавычек', () => {
    expect(
      formatOrgSearchString({
        filters: { minCost: 5, maxCost: 40, minEvents: 5 },
      })
    ).toBe('minCost:5 maxCost:40 minEvents:5');
  });

  it('делает roundtrip с текстом и игровой системой', () => {
    const formatted = formatOrgSearchString({
      q: 'alice',
      filters: {
        preferredSystems: ['DUNGEONS_AND_DRAGONS_5E'],
        minCost: 5,
        maxCost: 40,
        minEvents: 5,
      },
    });

    expect(formatted).toBe(
      'alice preferredSystems:DUNGEONS_AND_DRAGONS_5E minCost:5 maxCost:40 minEvents:5'
    );
    expect(parseOrgSearchString(formatted)).toEqual({
      q: 'alice',
      preferredSystems: ['DUNGEONS_AND_DRAGONS_5E'],
      minCost: 5,
      maxCost: 40,
      minEvents: 5,
    });
  });
});
