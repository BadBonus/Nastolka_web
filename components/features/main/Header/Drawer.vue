<script setup lang="ts">
import { AuthForm, UsersDrawerNav } from "#components";

defineOptions({
  name: "HeaderDrawer",
});

const props = withDefaults(defineProps<{ isAuth?: boolean }>(), {
  isAuth: false,
});

const open = ref<boolean>(false);
const route = useRoute();
const bodyComponent = computed(() =>
  props.isAuth ? UsersDrawerNav : AuthForm,
);

watch(
  () => route.name,
  () => {
    open.value = false;
  },
);
</script>
<template>
  <UDrawer
    v-model:open="open"
    :transition="false"
    description="Навигация сайта"
    :ui="{
      header: 'flex items-center justify-between',
      content: 'max-w-[360px] ring-0',
    }"
    direction="right"
    id="reka-dialog-content-v-0-1"
    title="тест"
  >
    <UButton color="primary">
      <Icon name="ci:hamburger-lg" />
    </UButton>

    <template #header>
      <h2 v-if="!isAuth" class="font-main text-4xl font-bold text-white">
        Авторизация
      </h2>
      <UsersDrawerBaseInfo v-else />

      <Button
        icon="i-lucide-x"
        color="primary"
        variant="filled"
        @click="open = false"
        only-icon
      />
    </template>

    <template #body>
      <component :is="bodyComponent" />
      <USeparator class="mt-4" color="primary" type="solid" />
      <MainNavigation class="mt-4" />
    </template>
  </UDrawer>
</template>

<style>
#reka-dialog-content-v-0-1 {
  font-family: "ShantellSans", "Roboto";
}
</style>
