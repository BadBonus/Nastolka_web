import * as z from "zod";
import type {TApiPayloads} from "@consts/api-endpoints";

type TREQ = TApiPayloads['AUTH']['LOGIN']['POST']['req'];

export const loginUserSchema: z.ZodType<TREQ> = z.object({
  email: z.string().email("Некоректный имейл"),
  password: z.string().min(8, "Минимум 8 символов"),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;