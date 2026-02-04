import useAuthFlow from "~/composables/use-cases/useAuthFlow";
import {AUTH_COOKIE_TOKEN_NAME} from '~/shared/utils/auth.constants';

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const {getUserMe, logout} = useAuthFlow();
  const refreshToken = useCookie(AUTH_COOKIE_TOKEN_NAME);

  if (!refreshToken.value || authStore.user) return;

  try {
    getUserMe();
  } catch (e) {
    logout();
  }
});