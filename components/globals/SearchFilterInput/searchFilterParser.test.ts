// searchFilterParser.test.ts

import { describe, expect, it } from 'vitest';
import {
  getCaretContext,
  insertEntity,
  insertTag,
  parseSearchString,
  removeToken,
  toggleTokenNegation,
} from './searchFilterParser';

describe('parseSearchString', () => {
  it('парсит обычный текст', () => {
    const tokens = parseSearchString('foo bar');
    expect(tokens).toEqual([
      { type: 'text', raw: 'foo', start: 0, end: 3 },
      { type: 'text', raw: 'bar', start: 4, end: 7 },
    ]);
  });

  it('парсит фильтр с кавычками и спецсимволами', () => {
    const tokens = parseSearchString('gameSystem:"dnd #1"');
    expect(tokens).toEqual([
      {
        type: 'filter',
        key: 'gameSystem',
        value: 'dnd #1',
        raw: 'gameSystem:"dnd #1"',
        start: 0,
        end: 19,
      },
    ]);
  });

  it('парсит инвертированный фильтр', () => {
    const tokens = parseSearchString('-parody:"the idolmaster"');
    expect(tokens).toEqual([
      {
        type: 'negated_filter',
        key: 'parody',
        value: 'the idolmaster',
        raw: '-parody:"the idolmaster"',
        start: 0,
        end: 24,
      },
    ]);
  });

  it('парсит комбинацию из текста и нескольких фильтров', () => {
    const input = 'image category:"manga" -language:"chinese" foo';
    const tokens = parseSearchString(input);

    expect(tokens).toHaveLength(4);
    expect(tokens[1]).toMatchObject({
      type: 'filter',
      key: 'category',
      value: 'manga',
    });
    expect(tokens[2]).toMatchObject({
      type: 'negated_filter',
      key: 'language',
      value: 'chinese',
    });
  });
});

describe('getCaretContext', () => {
  it('возвращает empty для пустой строки', () => {
    expect(getCaretContext('', 0)).toEqual({ type: 'empty' });
  });

  it('определяет состояние после ключа тега', () => {
    const input = 'gameSystem:';
    const context = getCaretContext(input, 11);

    expect(context).toMatchObject({
      type: 'after_tag_key',
      tagKey: 'gameSystem',
      isNegated: false,
    });
  });

  it('определяет состояние ввода внутри значения сущности', () => {
    const input = 'gameSystem:foo';
    const context = getCaretContext(input, 14);

    expect(context).toMatchObject({
      type: 'inside_entity_value',
      tagKey: 'gameSystem',
      queryWord: 'foo',
      isNegated: false,
    });
  });

  it('определяет состояние каретки на сформированном токене', () => {
    const input = 'gameSystem:"dnd"';
    const context = getCaretContext(input, 13);

    expect(context.type).toBe('on_token');
    expect(context.activeToken).toMatchObject({
      key: 'gameSystem',
      value: 'dnd',
    });
  });

  it('определяет состояние каретки внутри обычного слова', () => {
    const input = 'image category:"manga" foo';
    const context = getCaretContext(input, 25);

    expect(context).toMatchObject({
      type: 'inside_word',
      queryWord: 'foo',
    });
  });
});

describe('Функции форматирования строки', () => {
  it('insertTag вставляет ключ и ставит двоеточие', () => {
    const { newString, newCaretPos } = insertTag('foo ', 4, 'gameSystem');
    expect(newString).toBe('foo gameSystem:');
    expect(newCaretPos).toBe(15);
  });

  it('insertEntity подставляет сущность в кавычках с пробелом на конце', () => {
    const { newString, newCaretPos } = insertEntity('gameSystem:', 11, 'dnd');
    expect(newString).toBe('gameSystem:"dnd" ');
    expect(newCaretPos).toBe(17);
  });

  it('toggleTokenNegation переключает плюс и минус у тега', () => {
    const tokens = parseSearchString('category:"manga"');
    const { newString } = toggleTokenNegation('category:"manga"', tokens[0]);
    expect(newString).toBe('-category:"manga"');
  });

  it('removeToken удаляет токен из строки', () => {
    const input = 'image category:"manga" foo';
    const tokens = parseSearchString(input);
    const { newString } = removeToken(input, tokens[1]);
    expect(newString).toBe('image foo');
  });
});
