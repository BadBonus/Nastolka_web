import {EDays, ETimePeriods} from "./types";

export const daysConfig = [
  {id: EDays.monday, shortName: "Пн"},
  {id: EDays.tuesday, shortName: "Вт"},
  {id: EDays.wednesday, shortName: "Ср"},
  {id: EDays.thursday, shortName: "Чт"},
  {id: EDays.friday, shortName: "Пт"},
  {id: EDays.saturday, shortName: "Сб"},
  {id: EDays.sunday, shortName: "Вс"},
];

export const timePeriodsConfig = [
  {id: ETimePeriods.morning, icon: "morning.svg"},
  {id: ETimePeriods.afternoon, icon: "sunny.svg"},
  {id: ETimePeriods.evening, icon: "evening.svg"},
  {id: ETimePeriods.night, icon: "moon.svg"},
];