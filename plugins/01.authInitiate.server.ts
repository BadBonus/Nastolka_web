import type { TApiPayloads } from '#consts/api-endpoints';
import { appendResponseHeader } from 'h3';
import { AUTH_COOKIE_TOKEN_NAME } from '#consts/auth.constants';
import { sanitizeNulls } from '~/utils/transformers/nullToUndefined';

type TRefreshRes = TApiPayloads['AUTH']['REFRESH']['POST']['res'];

export default defineNuxtPlugin(async () => {
  const event = useRequestEvent();
  if (!event || event?.path.includes('.')) return;

  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  if (!authStore.userAuthData) {
    const cookie = useRequestHeaders(['cookie']).cookie ?? '';

    if (!cookie.includes(AUTH_COOKIE_TOKEN_NAME)) return;

    try {
      const response = await $fetch.raw('/auth/refresh', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: useRequestHeaders(['cookie']),
      });

      const rawSetCookie = response.headers.getSetCookie?.() ?? [response.headers.get('set-cookie')].filter(Boolean);

      for (const cookieStr of rawSetCookie) {
        appendResponseHeader(event, 'set-cookie', cookieStr);
      }

      const data = response._data as unknown as TRefreshRes;

      if (data) {
        authStore.setAccessToken(data.accessToken);
        authStore.setUser(sanitizeNulls(data.user));
      }
    } catch (error) {
      console.error(error);
      await navigateTo('/');
      return;
    }
  }
});
