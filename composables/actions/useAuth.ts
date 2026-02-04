
import {urlAuthUserLogin, urlAuthRefresh, urlAuthLogout} from "@/api";
import type {TLoginUserSchema} from "@/shared/validationSchemas/login";
import type {TLoginPostFB} from "~/shared/types/serverFB/auth";


export const useAuthActions = () => {
  const error = ref<string | null>(null)

  const loginAction = async (body: TLoginUserSchema) => {
    error.value = null

    try {
      const data = await $fetch<TLoginPostFB>(urlAuthUserLogin, {method: 'POST', body})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка входа'
      throw err
    }
  }

  const refreshAction = async () => {
    error.value = null

    try {
      const data = await $fetch(urlAuthRefresh, {method: 'POST'})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка обновления токена'
      throw err
    }
  }

  const logoutAction = async () => {
    error.value = null

    try {
      await $fetch(urlAuthLogout, {method: 'DELETE'})
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка выхода'
      throw err
    }
  }

  return {
    loginAction,
    refreshAction,
    logoutAction,
    error
  }
}