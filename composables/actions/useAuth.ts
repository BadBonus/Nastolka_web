
import {API_ENDPOINTS, type TApiPayloads} from "@consts/api-endpoints"
import type {TLoginUserSchema, TRegisterUserSchema} from "@valSchemas";
import type {TRefreshTokenFB, TLoginPostFB} from "@/shared/types/serverFB";
import type {TUser} from "@/shared/types/global";

const urlAuthUserLogin = API_ENDPOINTS.AUTH.LOGIN;
const urlAuthRefresh = API_ENDPOINTS.AUTH.REFRESH;
const urlAuthLogout = API_ENDPOINTS.AUTH.LOGOUT;
const urlUserMe = API_ENDPOINTS.AUTH.ME;
const urlAuthRegister = API_ENDPOINTS.AUTH.REGISTER;

export const useAuthActions = () => {
  const error = ref<string | null>(null)

  const loginAction = async (body: TApiPayloads['AUTH']['LOGIN']['POST']['req']) => {
    error.value = null

    try {
      const data = await useApi<TApiPayloads['AUTH']['LOGIN']['POST']['res']>(API_ENDPOINTS.AUTH.LOGIN, {method: 'POST', body, noControle: true})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка входа'
      throw err
    }
  }

  const refreshAction = async (): Promise<TRefreshTokenFB> => {
    error.value = null

    try {
      const data = await useApi<TRefreshTokenFB>(urlAuthRefresh, {method: 'POST', noControle: true})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка обновления токена'
      throw err
    }
  }

  const logoutAction = async () => {
    error.value = null

    try {
      await useApi(urlAuthLogout, {method: 'DELETE', noControle: true})
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка выхода'
      throw err
    }
  }

  const getUserMeAction = async () => {
    error.value = null
    try {
      const data = await useApi<TUser>(urlUserMe, {method: 'GET', silent: true, noControle: true})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения данных пользователя'
      throw err
    }
  }

  const registerUserAction = async (body: TRegisterUserSchema): Promise<TLoginPostFB> => {
    error.value = null

    try {
      const data = await useApi<TLoginPostFB>(urlAuthRegister, {method: 'POST', body, noControle: true})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка регистрации'
      throw err
    }
  }

  return {
    loginAction,
    refreshAction,
    logoutAction,
    getUserMeAction,
    registerUserAction,
    error
  }
}