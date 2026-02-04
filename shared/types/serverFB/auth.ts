import type {TUser} from "~/shared/types/global";

export type TLoginPostFB = {
  user: TUser,
  accessToken: string;
}