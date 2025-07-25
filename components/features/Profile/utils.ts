import type {TabsItem} from '@nuxt/ui'
import {EProfileNavigation} from "./types";

export const sections: TabsItem[] = [
  {
    label: "Профиль",
    icon: 'i-lucide-user',
    value: EProfileNavigation.Overview
  },
  {
    label: "История",
    value: EProfileNavigation.History,
    icon: 'material-symbols-history',
  },
  {
    label: "Подписки",
    value: EProfileNavigation.Subscriptions,
    icon: 'hugeicons-favourite-square',
  },
  {
    label: "Оплата",
    value: EProfileNavigation.Payment,
    icon: 'ic-baseline-payment',
  },
  {
    label: "Геймастер",
    value: EProfileNavigation.GameMaster,
    icon: 'i-game-icons-cubes',
    ui: {
      root: '!bg-red',
      content: '!bg-info',
      
    }
  },
];