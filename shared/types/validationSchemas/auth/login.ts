import * as z from "zod";
import type {TApiPayloads} from "@consts/api-endpoints";

type LoginReq = TApiPayloads['AUTH']['LOGIN']['POST']['req'];

export const loginUserSchema: z.ZodType<LoginReq> = z.object({
  email: z.string().email("Некоректный имейл"),
  password: z.string().min(8, "Минимум 8 символов"),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;