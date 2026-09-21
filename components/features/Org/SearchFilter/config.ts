import {GameSystem} from '#openApi/enums';
import type {TagConfig} from '@/components/globals/SearchFilterInput/types';

const preferredSystemsBadgeColor = 'border-2 border-black';

export const ORG_SEARCH_TAGS: TagConfig[] = [
  {key: 'preferredSystems', label: 'Игровая система', badgeColor: preferredSystemsBadgeColor},
  {key: 'minCost', label: 'мин.Цена'},
  {key: 'maxCost', label: 'макс.Цена'},
  {key: 'minEvents', label: 'мин.Сессий'},
];

export const ORG_SEARCH_VALUES: Record<string, readonly string[]> = {
  preferredSystems: GameSystem,
  minCost: ['5'],
  maxCost: ['40'],
  minEvents: ['5'],
};
