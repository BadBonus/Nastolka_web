<script setup lang="ts">
import useActions from '~/composables/use-cases/useProfileFlow';
const PROFILE_DATA = 'profile-data';
import Loader from '#components/globals/Loader.vue';

defineOptions({
  name: 'ProfileIndex',
});
definePageMeta({
  keepalive: true,
});

const { getMe, isLoading } = useActions();
const { data } = await useAsyncData(PROFILE_DATA, () => getMe());
</script>

<template>
  <section class="relative">
    <Loader v-if="isLoading" class="absCenter" />
    <h1 class="font-decorate-2 text-center text-2xl font-bold">Настройка профиля</h1>
    <profile-settings-main :data="data" :class="{ disabled: isLoading }" />
  </section>
</template>

<!-- <style lang="scss"></style> -->
