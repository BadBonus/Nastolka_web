import type { GameSystem } from '#openApi/enums';
import type { TGmCard } from '@/components/globals/GmCard.vue';
import type { TOrgIndexRes } from '@/composables/actions/useOrg';
import { GAME_SYSTEM_BADGES } from '#consts/gameSystems';

type TOrgListItem = DeepNullToUndefined<TOrgIndexRes['data'][number]>;

export type TOrgCard = TGmCard & { id: string };

export function mapOrgListItemToGmCard(org: TOrgListItem): TOrgCard {
  return {
    id: org.id,
    nickname: org.nickname,
    avatar: org.avatar,
    description: org.description,
    slug: org.slug,
    costValue: org.costValue,
    costCurrency: org.costCurrency,
    preferredSystems: org.preferredSystems
      ?.map((id) => GAME_SYSTEM_BADGES[id as GameSystem])
      .filter((badge): badge is (typeof GAME_SYSTEM_BADGES)[GameSystem] => Boolean(badge)),
  };
}
