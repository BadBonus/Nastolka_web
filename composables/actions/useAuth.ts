
import {API_ENDPOINTS, type TApiPayloads} from "@consts/api-endpoints"

type TLoginReq = TApiPayloads['AUTH']['LOGIN']['POST']['req'];
type TLoginRes = TApiPayloads['AUTH']['LOGIN']['POST']['res'];
type TRefreshRes = TApiPayloads['AUTH']['REFRESH']['POST']['res'];
type TRegReq = TApiPayloads['AUTH']['REGISTER']['POST']['req'];
type TRegRes = TApiPayloads['AUTH']['REGISTER']['POST']['res'];
type TMeRes = TApiPayloads['AUTH']['ME']['GET']['res'];

const urlAuthUserLogin = API_ENDPOINTS.AUTH.LOGIN;
const urlAuthRefresh = API_ENDPOINTS.AUTH.REFRESH;
const urlAuthLogout = API_ENDPOINTS.AUTH.LOGOUT;
const urlUserMe = API_ENDPOINTS.AUTH.ME;
const urlAuthRegister = API_ENDPOINTS.AUTH.REGISTER;

export const useAuthActions = () => {
  const error = ref<string | null>(null)
  const config = useRuntimeConfig();

  const loginAction = async (body: TLoginReq) => {
    error.value = null

    try {
      const data = await useApi<TLoginRes>(urlAuthUserLogin, {method: 'POST', body, noControle: true, credentials: 'include'})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка входа'
      throw err
    }
  }

  const refreshAction = async (): Promise<TRefreshRes> => {
    error.value = null
    const headers = useRequestHeaders(['cookie']);
    try {
      const data = await $fetch<TRefreshRes>(urlAuthRefresh, {
        method: 'POST',
        baseURL: config.public.apiBase,
        credentials: 'include',
        headers
      });
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка обновления токена';
      throw err;
    }
  }

  const logoutAction = async () => {
    error.value = null
    try {
      await useApi(urlAuthLogout, {method: 'DELETE'})
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка выхода'
      throw err
    }
  }

  const getUserMeAction = async () => {
    error.value = null
    try {
      const data = await useApi<TMeRes>(urlUserMe, {method: 'GET', credentials: 'include'})
      return data
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения данных пользователя'
      throw err
    }
  }

  const registerUserAction = async (body: TRegReq): Promise<TRegRes> => {
    error.value = null

    try {
      const data = await useApi<TRegRes>(urlAuthRegister, {
        method: 'POST', body, noControle: true, successMessage: {
          title: "Вы зарегистрированы",
          descr: "Письмо для подтверждения отправлено на почту"
        }
      })
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