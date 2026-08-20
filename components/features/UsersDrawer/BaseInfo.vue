<script setup lang="ts">
defineOptions({
  name: 'UsersDrawerBaseInfo',
});

const authStore = useAuthStore();
const { userAuthData } = storeToRefs(authStore);
</script>
<template>
  <NuxtLink to="/profile" class="UsersDrawerBaseInfo flex items-center gap-1.5">
    <UAvatar :src="userAuthData?.avatar" class="border-border h-14 w-14 border-2" />
    <h3 class="w-32.25 truncate text-lg font-semibold">{{ userAuthData?.nickname }}</h3>
  </NuxtLink>
</template>

<!--<style lang="scss"></style>-->
