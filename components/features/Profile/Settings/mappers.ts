import type { PROFILE } from '#openApi';
import type { TSettingsMainProps } from './Main.vue';

export type TProfileMeRes = DeepNullToUndefined<PROFILE['ME']['GET']['res']>;

export const mapToSettingsProps = (data: TProfileMeRes): TSettingsMainProps => ({
  nickname: data.nickname,
  timezone: data.timezone,
  email: data.email,
  fio: data.fullName,
  about: data.description,
  availableDays: data.schedules.map((item) => ({
    dayOfWeek: item.dayOfWeek,
    startTime: item.startTime,
    endTime: item.endTime,
  })),
  social_links: data.soclinks,
  avatar: data.avatar,
  birthdate: data.birthdate ? new Date() : undefined,
});
