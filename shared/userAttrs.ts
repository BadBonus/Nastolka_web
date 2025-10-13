import type {TSkillItem} from "./skills/index";

export enum EUserAttrs {
  popularity = 'popularity',
}

export type TAttrUserItem = Pick<TSkillItem, 'icon' | 'rating'> & {
  id: EUserAttrs
}

export const attrUserItems = {
  [EUserAttrs.popularity]: {id: EUserAttrs.popularity, rating: 0, icon: 'i-material-symbols:star'},
};

export const titleRussian: Record<EUserAttrs, string> = {
  [EUserAttrs.popularity]: 'Популярность',
};
