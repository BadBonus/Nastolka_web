
import {urlAuthUserLogin, urlAuthRefresh} from "@/api";
import type {TLoginUserSchema} from "@/shared/validationSchemas/login";
import type {TLoginPostFB} from "~/shared/types/serverFB/auth";


export const useAuthActions = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (body: TLoginUserSchema) => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch<TLoginPostFB>(urlAuthUserLogin, {method: 'POST', body})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка входа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const refresh = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch(urlAuthRefresh, {method: 'POST'})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка обновления токена'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    login,
    refresh,
    isLoading,
    error
  }
}