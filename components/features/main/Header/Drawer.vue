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
const bodyComponent = computed(() => {
  return props.isAuth ? UsersDrawerNav : AuthForm;
});

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
    :ui="{
      header: 'flex items-center justify-between',
      content: 'min-w-[320px]',
    }"
    direction="right"
  >
    <UButton color="primary">
      <Icon name="ci:hamburger-lg" />
    </UButton>

    <template #header>
      <h2 v-if="!isAuth" class="text-highlighted font-main text-4xl font-bold">
        Hi!
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

<!--<style lang="scss"></style>-->
