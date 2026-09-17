import {GameSystem} from '#openApi/enums';
import type {TagConfig} from '@/components/globals/SearchFilterInput/types';

const preferredSystemsBadgeColor = 'border-2 border-black';

export const ORG_SEARCH_TAGS: TagConfig[] = [
  {key: 'preferredSystems', label: 'Игровая система', badgeColor: preferredSystemsBadgeColor},
];

export const ORG_SEARCH_VALUES: Record<string, readonly string[]> = {
  preferredSystems: GameSystem,
};
