export const games = [{
  name: 'DND',
  id: 'dnd'
},
{
  name: 'Pathfinder',
  id: 'ph'
},
{
  name: 'Узники Аркхема',
  id: 'arkhem'
}
] as {
  name: string,
  id: string,
}[];

export enum EtypesOfPlatformGame {
  'nvm' = 'Не важно',
  'online' = 'online',
  'live' = 'вживую'
};
export const typesOfPlatformGame = ['не важно', 'online', 'вживую'] as EtypesOfPlatformGame[];

export const cities = ['Минск', 'Москва', 'Астана'];
export const webPlatforms = ['Discord', 'Skype', 'Telegram'];

export const typesOfGenres = ['Триллер', 'хардкор', 'фан-приключение'];

export const typesOfCompany = ['любой', 'oneshot', 'short company', 'long company'];

export const statusesOfGame = ['любой', 'Новая, набор игроков', 'Минимум игроков найден'];