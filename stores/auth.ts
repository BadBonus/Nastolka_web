import type {TUser} from "~/shared/types/global";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | TUser,
    isAuthenticated: false,
    accessToken: null as string | null,
  }),
  getters: {
    isUserAuth: (state) => state.isAuthenticated
  },
  actions: {
    setUser(user: TUser) {

      this.user = user;
      this.isAuthenticated = true;
      console.log(this.user);
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.accessToken = null;
    },

  },
});