import type { Component } from 'vue';
import evening from '@/public/images/svg/availibilityCalendar/evening.svg';
import moon from '@/public/images/svg/availibilityCalendar/moon.svg';
import morning from '@/public/images/svg/availibilityCalendar/morning.svg';
import sunny from '@/public/images/svg/availibilityCalendar/sunny.svg';

export interface ScheduleInterval {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
}

export const daysConfig = [
  { dayOfWeek: 1, shortName: 'Пн' },
  { dayOfWeek: 2, shortName: 'Вт' },
  { dayOfWeek: 3, shortName: 'Ср' },
  { dayOfWeek: 4, shortName: 'Чт' },
  { dayOfWeek: 5, shortName: 'Пт' },
  { dayOfWeek: 6, shortName: 'Сб' },
  { dayOfWeek: 7, shortName: 'Вс' },
] as const;

export const timePeriodsConfig = [
  { id: '8-12', startTime: 8, endTime: 12, icon: morning },
  { id: '12-17', startTime: 12, endTime: 17, icon: sunny },
  { id: '17-22', startTime: 17, endTime: 22, icon: evening },
  { id: '22-8', startTime: 22, endTime: 8, icon: moon },
] as const;
