import { type TApiPayloads } from '#consts/api-endpoints';
import type { TSettingsMainProps } from './Main.vue';

export type TProfileMeRes = DeepNullToUndefined<TApiPayloads['PROFILE']['ME']['GET']['res']>;

export const mapToSettingsProps = (data: TProfileMeRes): TSettingsMainProps => ({
  nickname: data.nickname,
  timezone: data.timezone,
  email: data.email,
  fio: data.fullName,
  about: data.description,
  availableDays: data.schedules.map((item) => ({
    day: item.dayOfWeek.toString(),
    start: item.startTime.toString(),
    end: item.endTime.toString(),
  })),
  social_links: data.soclinks,
  avatar: data.avatar,
});
