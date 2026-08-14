import { z } from 'zod';
import type { TSettingsProps } from '../DetailsForm.vue';

export const settingsDetailsFormSchema: z.ZodType<TSettingsProps> = z.object({
  nickname: z.string().min(1, 'Заполните никнейм'),
  timezone: z.string().min(1, 'Укажите часовой пояс'),
  email: z.email('Некорректный email'),
  fio: z.string().optional(),
  about: z.string().optional(),
  social_links: z.record(z.string(), z.string().optional()).optional(),
  availableDays: z.array(z.object({ day: z.number(), start: z.number(), end: z.number() })).optional(),
});
