import { EDays, ETimePeriods } from '#consts/gameShedule';
import evening from '@/public/images/svg/availibilityCalendar/evening.svg';
import moon from '@/public/images/svg/availibilityCalendar/moon.svg';
import morning from '@/public/images/svg/availibilityCalendar/morning.svg';
import sunny from '@/public/images/svg/availibilityCalendar/sunny.svg';

export const daysConfig = [
  { id: EDays.monday, shortName: 'Пн' },
  { id: EDays.tuesday, shortName: 'Вт' },
  { id: EDays.wednesday, shortName: 'Ср' },
  { id: EDays.thursday, shortName: 'Чт' },
  { id: EDays.friday, shortName: 'Пт' },
  { id: EDays.saturday, shortName: 'Сб' },
  { id: EDays.sunday, shortName: 'Вс' },
];

export const timePeriodsConfig: readonly { id: ETimePeriods; icon: Component }[] = [
  { id: ETimePeriods.morning, icon: morning },
  { id: ETimePeriods.afternoon, icon: sunny },
  { id: ETimePeriods.evening, icon: evening },
  { id: ETimePeriods.night, icon: moon },
] as const;
