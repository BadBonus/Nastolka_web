import {ERoles} from "../roles"

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

export const skillPlayer = Object.values(ESkillPlayer);
export const skillGameMaster = Object.values(ESkillGameMaster);

export const skillsByRole: Record<ERoles.player | ERoles.gamemaster, string[]> = {
  [ERoles.player]: skillPlayer,
  [ERoles.gamemaster]: skillGameMaster,
};