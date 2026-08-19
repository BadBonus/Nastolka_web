import { z } from 'zod';
import type { TSettingsProps } from '../DetailsForm.vue';
import type { AnyCalendarDate } from '@internationalized/date';

export const settingsDetailsFormSchema: z.ZodType<TSettingsProps> = z.object({
  nickname: z.string().min(1, 'Заполните никнейм'),
  timezone: z.string().min(1, 'Укажите часовой пояс'),
  email: z.email('Некорректный email'),
  fio: z.string().optional(),
  about: z.string().optional(),
  social_links: z.record(z.string(), z.string().optional()).optional(),
  availableDays: z.array(z.object({ dayOfWeek: z.number(), startTime: z.number(), endTime: z.number() })).optional(),
  birthdate: z
    .custom<AnyCalendarDate>((val) => Boolean(val && typeof val === 'object' && 'calendar' in val), {
      message: 'Укажите корректную дату',
    })
    .optional() as z.ZodType<AnyCalendarDate | undefined>,
});
