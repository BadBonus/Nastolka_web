import type {TLoginUserSchema} from "~/shared/validationSchemas/login";
import {useAuthActions} from "@/composables/actions/useAuth";

export const useLoginFlow = () => {
  const {login} = useAuthActions();
  const store = useAuthStore()
  const isLoading = ref(false)

  const execute = async (credentials: TLoginUserSchema) => {
    isLoading.value = true
    try {
      const data = await login(credentials)
      store.setUser(data.user);
      store.setAccessToken(data.accessToken);
      return data
    } finally {
      isLoading.value = false
    }
  }

  return {execute, isLoading}
}