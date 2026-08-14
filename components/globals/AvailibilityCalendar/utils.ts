import type { Component } from 'vue';
import evening from '@/public/images/svg/availibilityCalendar/evening.svg';
import moon from '@/public/images/svg/availibilityCalendar/moon.svg';
import morning from '@/public/images/svg/availibilityCalendar/morning.svg';
import sunny from '@/public/images/svg/availibilityCalendar/sunny.svg';

export interface ScheduleInterval {
  day: number;
  start: number;
  end: number;
}

export const daysConfig = [
  { day: 1, shortName: 'Пн' },
  { day: 2, shortName: 'Вт' },
  { day: 3, shortName: 'Ср' },
  { day: 4, shortName: 'Чт' },
  { day: 5, shortName: 'Пт' },
  { day: 6, shortName: 'Сб' },
  { day: 7, shortName: 'Вс' },
] as const;

export const timePeriodsConfig = [
  { id: '8-12', start: 8, end: 12, icon: morning },
  { id: '12-17', start: 12, end: 17, icon: sunny },
  { id: '17-22', start: 17, end: 22, icon: evening },
  { id: '22-8', start: 22, end: 8, icon: moon },
] as const;
