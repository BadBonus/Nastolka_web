import {titleRussian} from "@/shared/skills/index";
import {titleRussian as attrTitles, EUserAttrs, attrUserItems} from "@/shared/userAttrs";
import {skillItems, type ESkillGameMaster} from "@/shared/skills/index";
import {game_adv_types} from "@/shared/gameAttrs";
import type {TRadioGroupItem} from "@/components/globals/Radiogroup/index.vue";


export const titles = {...titleRussian, ...attrTitles}
export const radioBtns = [
  ...skillItems["gamemaster"].map((item) => ({
    maskIndicator: item.icon,
    value: item.id,
  })),
  {
    value: EUserAttrs.popularity,
    maskIndicator: attrUserItems[EUserAttrs.popularity].icon,
  },
] as TRadioGroupItem[];