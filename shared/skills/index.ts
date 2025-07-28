import {ERoles} from "../roles"

export type TSkillItem = {
  id: ESkillPlayer | ESkillGameMaster;
  rating: number;
  icon: string;
};

export enum ESkillPlayer {
  creativity = 'creativity',
  artistry = 'artistry',
  playerEducation = 'playerEducation',
}

export enum ESkillGameMaster {
  creativity = 'creativity',
  artistry = 'artistry',
  playerEducation = 'playerEducation',
  storytelling = 'storytelling',
  worldbuilding = 'worldbuilding',
}

export const skillItems: Record<ERoles.gamemaster | ERoles.player, TSkillItem[]> = {
  [ERoles.player]: [
    {id: ESkillPlayer.creativity, rating: 0, icon: 'game-icons:light-bulb'},
    {id: ESkillPlayer.artistry, rating: 0, icon: 'game-icons:duality-mask'},
    {id: ESkillPlayer.playerEducation, rating: 0, icon: 'game-icons:graduate-cap'},
  ],
  [ERoles.gamemaster]: [
    {id: ESkillGameMaster.creativity, rating: 0, icon: 'game-icons:light-bulb'},
    {id: ESkillGameMaster.artistry, rating: 0, icon: 'game-icons:duality-mask'},
    {id: ESkillGameMaster.playerEducation, rating: 0, icon: 'game-icons:graduate-cap'},
    {id: ESkillGameMaster.storytelling, rating: 0, icon: 'game-icons:teacher'},
    {id: ESkillGameMaster.worldbuilding, rating: 0, icon: 'game-icons:world'},
  ],
};

// FIXME: для начала я создаю такой массив стринговых наименований для скилла, это костыль-заглушка с учетом в дальнейшем перейти на i18n, что в корне поменяет структуру объектов.
export const titleRussian = {
  [ESkillPlayer.creativity]: 'Креативность',
  [ESkillPlayer.artistry]: 'Артистизм',
  [ESkillPlayer.playerEducation]: 'Обучение игроков',
  [ESkillGameMaster.storytelling]: 'Сторителлинг',
  [ESkillGameMaster.worldbuilding]: 'Проработка мира',
};

export const skillPlayer = Object.values(ESkillPlayer);
export const skillGameMaster = Object.values(ESkillGameMaster);

export const skillsByRole: Record<ERoles.player | ERoles.gamemaster, string[]> = {
  [ERoles.player]: skillPlayer,
  [ERoles.gamemaster]: skillGameMaster,
};