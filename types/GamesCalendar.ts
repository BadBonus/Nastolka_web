// enums

// types

export type TGamesCalendarOrg = {
  id: string;
  name: string;
  ava: string;
  link: string;
  rating: {
    count: number;
    value: number;
  };
}

export type TGamesCalendarEvent = {
  id: string;
  name: string;
  addInfo?: string;
  maxUsers?: number;
  currentUsers: number;
  cost: string;
  time: string;
  org: TGamesCalendarOrg;
  link: string;
};

// interfaces
