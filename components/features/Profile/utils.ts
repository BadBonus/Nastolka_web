import type {TabsItem} from '@nuxt/ui'
import {EProfileNavigation} from "./types";

export const sections: TabsItem[] = [
  {
    label: "Профиль",
    icon: 'i-lucide-user',
    value: EProfileNavigation.profile
  },
  {
    label: "История",
    value: EProfileNavigation.history,
    icon: 'material-symbols-history',
  },
  {
    label: "Подписки",
    value: EProfileNavigation.subscriptions,
    icon: 'hugeicons-favourite-square',
  },
  {
    label: "Оплата",
    value: EProfileNavigation.payment,
    icon: 'ic-baseline-payment',
  },
  {
    label: "Геймастер",
    value: EProfileNavigation['game-master'],
    icon: 'i-game-icons-cubes',
    ui: {
      root: '!bg-red',
      content: '!bg-info',

    }
  },
];

// type guard
function isProfileNavigationKey(key: string): key is EProfileNavigation {
  return Object.values(EProfileNavigation).includes(key as EProfileNavigation);
}

export function getLastNavigationSegment(path: string): EProfileNavigation | null {
  const match = path.match(/([^/]+)\/?$/);
  const segment = match ? match[1] : "";

  if (segment && isProfileNavigationKey(segment)) {
    return segment;
  }

  return null;
}