import * as z from 'zod';
import type { TApiPayloads } from '#consts/api-endpoints';

type TREQ = TApiPayloads['PROFILE']['ME']['PATCH']['req'];

export const loginUserSchema: z.ZodType<TREQ> = z.object({
  email: z.email('Некоректный имейл'),
  password: z.string().min(8, 'Минимум 8 символов'),
});
