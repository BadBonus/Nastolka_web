
import {appendResponseHeader} from 'h3'
import type {TUser} from '#types/global'
import {AUTH_COOKIE_TOKEN_NAME} from '#consts/auth.constants';

export default defineNuxtPlugin(async () => {
  const event = useRequestEvent()
  if (!event || event?.path.includes('.')) return

  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  if (!authStore.user) {

    const cookie = useRequestHeaders(['cookie']).cookie ?? '';

    if (!cookie.includes(AUTH_COOKIE_TOKEN_NAME)) return;

    try {
      const response = await $fetch.raw('/auth/refresh', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: useRequestHeaders(['cookie']),
      })

      const rawSetCookie = response.headers.getSetCookie?.()
        ?? [response.headers.get('set-cookie')].filter(Boolean)

      for (const cookieStr of rawSetCookie) {
        appendResponseHeader(event, 'set-cookie', cookieStr)
      }

      const data = response._data as {accessToken: string; user: TUser}
      if (data) {
        authStore.setAccessToken(data.accessToken)
        authStore.setUser(data.user)
      }
    } catch (error) {
      // пользователь не авторизован
      console.error(error);
    }
  }
})