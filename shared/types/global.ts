import type {ESocLinks} from "@/shared/socLinks";
export type TSoclinksObject = Partial<Record<ESocLinks, string | undefined>>;
export type TGameHistory = Array<{id: string, startTime: string}>;
export type TUser = {
  nickname: string;
  email: string;
  id: number;
}