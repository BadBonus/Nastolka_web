import { type TApiPayloads } from '@/shared/constants/api-endpoints';
import useActions from '@/composables/actions/useAuth';
import type { TRegisterUserSchema } from '#components/features/AuthForm/schemas/registration-form.schema';
import { sanitizeNulls } from '~/utils/transformers/nullToUndefined';

export default function useAuthFlow() {
  const { loginAction, refreshAction, logoutAction, getUserMeAction, registerUserAction } = useActions();
  const store = useAuthStore();
  const isLoading = ref(false);

  console.log('ты выще срабатываешь?');

  const login = async (credentials: TApiPayloads['AUTH']['LOGIN']['POST']['req']) => {
    isLoading.value = true;
    try {
      const data = await loginAction(credentials);
      store.setUser(sanitizeNulls(data.user));
      store.setAccessToken(data.accessToken);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const refreshToken = async () => {
    isLoading.value = true;
    try {
      const data = await refreshAction();
      if (data) {
        store.setAccessToken(data.accessToken);
        store.setUser(sanitizeNulls(data.user));
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    try {
      await logoutAction();
      store.logout();
    } finally {
      isLoading.value = false;
    }
  };

  const getUserMe = async () => {
    isLoading.value = true;
    try {
      const data = await getUserMeAction();
      store.setUser(sanitizeNulls(data));
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const registerUser = async (credentials: TRegisterUserSchema) => {
    isLoading.value = true;
    try {
      await registerUserAction(credentials);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { login, logout, refreshToken, getUserMe, registerUser, isLoading };
}
