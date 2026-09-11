export enum ETokenTypes {
  Text = 'text',
  Filter = 'filter',
  NegatedFilter = 'negated_filter',
}
export type TokenType = `${ETokenTypes}`;

export interface Token {
  type: TokenType;
  key?: string;
  value?: string;
  raw: string;
  start: number;
  end: number;
}
