import type {TUser} from "~/shared/types/global";

export type TLoginPostFB = {
  user: TUser,
  accessToken: string;
}

export type TRefreshTokenFB = {
  user: TUser;
  accessToken: string;
}