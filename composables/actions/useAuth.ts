
import {urlAuthUserLogin, urlAuthRefresh, urlAuthLogout, urlUserMe} from "@/api";
import type {TLoginUserSchema} from "@/shared/validationSchemas/login";
import type {TRefreshTokenFB, TLoginPostFB} from "@/shared/types/serverFB";
import type {TUser} from "@/shared/types/global";

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

  const refreshAction = async (): Promise<TRefreshTokenFB> => {
    error.value = null

    try {
      const data = await $fetch<TRefreshTokenFB>(urlAuthRefresh, {method: 'POST'})
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

  const getUserMeAction = async () => {
    error.value = null
    try {
      const data = await useApi<TUser>(urlUserMe, {method: 'GET', silent: true})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения данных пользователя'
      throw err
    }
  }

  return {
    loginAction,
    refreshAction,
    logoutAction,
    getUserMeAction,
    error
  }
}