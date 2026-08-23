export enum TGamesCalendarCurrency {
  EUR = 'EUR',
  USD = 'USD',
  RUB = 'RUB',
  BYN = 'BYN',
}

export enum EStatusOfEvent {
  PREPARE = 'PREPARE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export enum EStatusOfRequest {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  CONFIRM = 'CONFIRM',
  CANCELED = 'CANCELED',
}

export enum EKindOfRate {
  CREATIVITY = 'CREATIVITY',
  STORYTELLING = 'STORYTELLING',
  WIKIPEDIA_RULES = 'WIKIPEDIA_RULES',
  THEATRICALISE = 'THEATRICALISE',
}

export type TGamesCalendarOrgRating = {
  name: EKindOfRate;
  value: number;
};

export type TGamesCalendarOrg = {
  id: string;
  name: string;
  avatar: string;
  link: string;
  rating: TGamesCalendarOrgRating[];
  countOfEvents: number;
};

export type TGamesCalendarEventPlayer = {
  link: string;
  avatar: string;
  name: string;
};

export type TGamesCalendarEvent = {
  id: string;
  gameMaster: TGamesCalendarOrg;
  name: string;
  addInfo?: string;
  maxUsers?: number;
  currentUsers: number;
  cost?: {
    value: number;
    currency: TGamesCalendarCurrency;
  };
  time: string;
  org: TGamesCalendarOrg;
  link: string;
  state: EStatesOfEvent;
  rates: TEventCommentRate[];
  timeStart: number;
  timeFinish: number;
  createdAt: Date;
  players: TGamesCalendarEventPlayer[];
};

export type TEventCommentRate = {
  id: string;
  userId: string;
  eventId: string;
  avatar: string;
  name: string;
  comment: string;
  uprate: EKindOfRate[];
  createdAt: Date;
};

export type TEventRequest = {
  id: string;
  idEvent: number; // через ивент можно выйти на мастера
  idUser: number;
  status: EStatusOfRequest; //статус заявки (на рассмотрении, принята, отклонена, отменена игроком). Без этого поля невозможно определить текущее состояние взаимодействия.
  createdAt: Date; //метка времени создания заявки для формирования очереди кандидатов.
  message?: string; //опциональный текст от игрока (предпочтения по роли, концепт персонажа).
};
// interfaces
