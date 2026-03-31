import {useAuthActions} from "@/composables/actions/useAuth";
import {config} from "process";
import {appendResponseHeader, setCookie} from 'h3'

export default defineNuxtPlugin(async () => {
  const event = useRequestEvent()
  if (!event || event?.path.includes('.')) return

  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  if (!authStore.user) {
    try {
      const response = await $fetch.raw('/auth/refresh', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: useRequestHeaders(['cookie']),
      })

      // Явно парсим и пробрасываем каждую Set-Cookie
      const rawSetCookie = response.headers.getSetCookie?.()
        ?? [response.headers.get('set-cookie')].filter(Boolean)

      console.log('RAW SET-COOKIE ARRAY:', rawSetCookie)

      for (const cookieStr of rawSetCookie) {
        appendResponseHeader(event, 'set-cookie', cookieStr)
      }

      const data = response._data as {accessToken: string; user: any}
      if (data) {
        authStore.setAccessToken(data.accessToken)
        authStore.setUser(data.user)
      }
    } catch {
      // пользователь не авторизован
    }
  }
})