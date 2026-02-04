import type {TLoginUserSchema} from "~/shared/validationSchemas/login";
import {useAuthActions} from "@/composables/actions/useAuth";

export default function useAuthFlow() {
  const {
    loginAction,
    refreshAction,
    logoutAction,
    getUserMeAction
  } = useAuthActions();
  const store = useAuthStore()
  const isLoading = ref(false)

  const login = async (credentials: TLoginUserSchema) => {
    isLoading.value = true
    try {
      const data = await loginAction(credentials)
      store.setUser(data.user);
      store.setAccessToken(data.accessToken);
      return data
    }
    catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false
    }
  }

  const refreshToken = async () => {
    isLoading.value = true
    try {
      const data = await refreshAction()
      store.setAccessToken(data.accessToken);
      store.setUser(data.user);
    } catch (error) {
      console.log(error);
      throw error;
    }

    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      store.logout();
      await logoutAction()
    } finally {
      isLoading.value = false
    }
  }

  const getUserMe = async () => {
    isLoading.value = true
    try {
      const data = await getUserMeAction()
      store.setUser(data);
      return data
    } catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false
    }
  }

  return {login, logout, refreshToken, getUserMe, isLoading}
}