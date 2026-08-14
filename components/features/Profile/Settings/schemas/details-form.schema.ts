import { z } from 'zod';

export const settingsDetailsFormSchema = z.object({
  nickname: z.string().min(1, 'Заполните никнейм'),
  timezone: z.string().min(1, 'Укажите часовой пояс'),
  email: z.email('Некорректный email'),
  fio: z.string().nullable().optional(),
  about: z.string().nullable().optional(),
  gm_style: z.string().nullable().optional(),
  social_links: z.record(z.string(), z.string().optional()).nullable().optional(),
});

export type TSettingsDetailsFormSchema = z.infer<typeof settingsDetailsFormSchema>;
