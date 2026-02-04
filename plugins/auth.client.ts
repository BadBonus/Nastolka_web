export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();

  try {
    await authStore.refresh();
  } catch (e) {
    console.warn('Refresh token failed, user is guest', e);
  }
});