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
  'nvm' = 'nvm',
  'online' = 'online',
  'live' = 'live'
};
export const typesOfPlatformGame = [
  {
    name: 'Не важно',
    id: EtypesOfPlatformGame['nvm']
  }, {
    name: 'Онлайн',
    id: EtypesOfPlatformGame['online']
  }, {
    name: 'Вживую',
    id: EtypesOfPlatformGame['live']
  }] as {name: string, id: EtypesOfPlatformGame}[];

export const cities = ['Online', 'Минск', 'Москва', 'Астана'];
export const webPlatforms = ['Discord', 'Skype', 'Telegram'];

export const typesOfGenres = ['Триллер', 'хардкор', 'фан-приключение'];

export const typesOfCompany = ['oneshot', 'short company', 'long company'];

export const statusesOfGame = ['любой', 'Набор', 'Минимум есть'];