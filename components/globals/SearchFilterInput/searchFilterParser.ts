export type TokenType = 'text' | 'filter' | 'negated_filter';

export interface Token {
  type: TokenType;
  key?: string;
  value?: string;
  raw: string;
  start: number;
  end: number;
}

export type CaretContextType = 'empty' | 'after_tag_key' | 'inside_entity_value' | 'inside_word' | 'on_token';

export interface CaretContext {
  type: CaretContextType;
  activeToken?: Token;
  queryWord?: string;
  tagKey?: string;
  isNegated?: boolean;
  prefixStart?: number;
  prefixEnd?: number;
}

export function parseSearchString(input: string): Token[] {
  const tokens: Token[] = [];

  if (!input) {
    return tokens;
  }

  const tokenRegex = /(-?)([a-zA-Z0-9_]+):(?:"([^"]*)"|([^\s]*))|([^\s]+)/g;

  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(input)) !== null) {
    const raw = match[0];
    const start = match.index;
    const end = start + raw.length;

    if (match[2] !== undefined) {
      const isNegated = match[1] === '-';
      const key = match[2];
      const value = match[3] !== undefined ? match[3] : (match[4] ?? '');

      tokens.push({
        type: isNegated ? 'negated_filter' : 'filter',
        key,
        value,
        raw,
        start,
        end,
      });
    } else {
      tokens.push({
        type: 'text',
        raw,
        start,
        end,
      });
    }
  }

  return tokens;
}

export function getCaretContext(input: string, caretPos: number): CaretContext {
  if (!input || input.trim() === '') {
    return { type: 'empty' };
  }

  const safeCaretPos = Math.max(0, Math.min(caretPos, input.length));

  const tokens = parseSearchString(input);

  for (const token of tokens) {
    if (
      (token.type === 'filter' || token.type === 'negated_filter') &&
      token.raw.includes('"') &&
      safeCaretPos >= token.start &&
      safeCaretPos <= token.end
    ) {
      return {
        type: 'on_token',
        activeToken: token,
      };
    }
  }

  const leftPart = input.slice(0, safeCaretPos);

  const incompleteFilterMatch = leftPart.match(/(-?)([a-zA-Z0-9_]+):([^\s]*)$/);

  if (incompleteFilterMatch) {
    const isNegated = incompleteFilterMatch[1] === '-';

    const tagKey = incompleteFilterMatch[2];
    const currentVal = incompleteFilterMatch[3];

    const prefixStart = safeCaretPos - incompleteFilterMatch[0].length;

    const prefixEnd = safeCaretPos;

    if (!currentVal) {
      return {
        type: 'after_tag_key',
        tagKey,
        isNegated,
        prefixStart,
        prefixEnd,
      };
    }

    return {
      type: 'inside_entity_value',
      tagKey,
      queryWord: currentVal.replace(/^"/, ''),
      isNegated,
      prefixStart,
      prefixEnd,
    };
  }

  const wordMatch = leftPart.match(/([^\s]+)$/);

  if (wordMatch) {
    const rightPart = input.slice(safeCaretPos);

    const rightWordMatch = rightPart.match(/^([^\s]+)/);

    const fullWord = wordMatch[1] + (rightWordMatch?.[1] ?? '');

    const wordStart = safeCaretPos - wordMatch[1].length;

    const wordEnd = safeCaretPos + (rightWordMatch?.[1]?.length ?? 0);

    return {
      type: 'inside_word',
      queryWord: fullWord,
      prefixStart: wordStart,
      prefixEnd: wordEnd,
    };
  }

  return { type: 'empty' };
}

export function insertTag(
  input: string,
  caretPos: number,
  tagKey: string
): {
  newString: string;
  newCaretPos: number;
} {
  const safeCaretPos = Math.max(0, Math.min(caretPos, input.length));

  const leftPart = input.slice(0, safeCaretPos);
  const rightPart = input.slice(safeCaretPos);

  const wordMatch = leftPart.match(/([^\s]+)$/);

  const startPos = wordMatch ? safeCaretPos - wordMatch[1].length : safeCaretPos;

  const insertion = `${tagKey}:`;

  const newString = input.slice(0, startPos) + insertion + rightPart.replace(/^[^\s]*/, '');

  const newCaretPos = startPos + insertion.length;

  return {
    newString,
    newCaretPos,
  };
}

export interface InsertEntityOptions {
  tagKey?: string;
  isNegated?: boolean;
}

export function insertEntity(
  input: string,
  caretPos: number,
  entityValue: string,
  options: InsertEntityOptions = {}
): {
  newString: string;
  newCaretPos: number;
} {
  const safeCaretPos = Math.max(0, Math.min(caretPos, input.length));

  const { tagKey, isNegated = false } = options;

  const leftPart = input.slice(0, safeCaretPos);
  const rightPart = input.slice(safeCaretPos);

  /*
   * 1. Уже существует незавершённый filter:
   *
   * gameSystem:w*
   *       ↓
   * gameSystem:"world_of_darkness" *
   */
  const incompleteFilterMatch = leftPart.match(/(-?[a-zA-Z0-9_]+:)[^\s]*$/);

  if (incompleteFilterMatch) {
    const filterPrefix = incompleteFilterMatch[1];

    const prefixStart = safeCaretPos - incompleteFilterMatch[0].length;

    const resolvedTagKey = tagKey ?? filterPrefix.replace(/^-/, '').replace(/:$/, '');

    const negation = isNegated || filterPrefix.startsWith('-');

    const prefix = `${negation ? '-' : ''}${resolvedTagKey}:`;

    const replacement = `${prefix}"${entityValue}" `;

    /*
     * Убираем остаток незавершённого значения
     * справа от caret.
     */
    const cleanRight = rightPart.replace(/^"[^"]*"?/, '').replace(/^[^\s]*/, '');

    const newString = input.slice(0, prefixStart) + replacement + cleanRight;

    return {
      newString,
      newCaretPos: prefixStart + replacement.length,
    };
  }

  /*
   * 2. Обычное слово:
   *
   * w*
   * ↓
   * gameSystem:"world_of_darkness" *
   *
   * Здесь принципиально важно заменить слово,
   * а не добавить entity после него.
   */
  const wordMatch = leftPart.match(/([^\s]+)$/);

  if (wordMatch) {
    const wordStart = safeCaretPos - wordMatch[1].length;

    const rightWordMatch = rightPart.match(/^([^\s]+)/);

    const rightWordLength = rightWordMatch?.[1]?.length ?? 0;

    const wordEnd = safeCaretPos + rightWordLength;

    if (tagKey) {
      const prefix = `${isNegated ? '-' : ''}${tagKey}:`;

      const replacement = `${prefix}"${entityValue}" `;

      const newString = input.slice(0, wordStart) + replacement + input.slice(wordEnd);

      return {
        newString,
        newCaretPos: wordStart + replacement.length,
      };
    }

    /*
     * Fallback, если suggestion не содержит tagKey.
     *
     * Тогда просто заменяем текущее слово entity.
     */
    const replacement = `"${entityValue}" `;

    const newString = input.slice(0, wordStart) + replacement + input.slice(wordEnd);

    return {
      newString,
      newCaretPos: wordStart + replacement.length,
    };
  }

  /*
   * 3. Нет слова/filter — вставляем entity
   * в позицию caret.
   */
  const prefix = tagKey ? `${isNegated ? '-' : ''}${tagKey}:` : '';

  const replacement = `${prefix}"${entityValue}" `;

  const newString = input.slice(0, safeCaretPos) + replacement + rightPart;

  return {
    newString,
    newCaretPos: safeCaretPos + replacement.length,
  };
}

export function toggleTokenNegation(
  input: string,
  token: Token
): {
  newString: string;
  newCaretPos: number;
} {
  if (!token.key) {
    return {
      newString: input,
      newCaretPos: token.end,
    };
  }

  let updatedTokenRaw = '';

  if (token.type === 'negated_filter') {
    updatedTokenRaw = `${token.key}:"${token.value}"`;
  } else {
    updatedTokenRaw = `-${token.key}:"${token.value}"`;
  }

  const newString = input.slice(0, token.start) + updatedTokenRaw + input.slice(token.end);

  const newCaretPos = token.start + updatedTokenRaw.length;

  return {
    newString,
    newCaretPos,
  };
}

export function removeToken(
  input: string,
  token: Token
): {
  newString: string;
  newCaretPos: number;
} {
  const before = input.slice(0, token.start);
  const after = input.slice(token.end);

  const newString = (before + after).replace(/\s+/g, ' ').trim();

  const newCaretPos = Math.min(token.start, newString.length);

  return {
    newString,
    newCaretPos,
  };
}
