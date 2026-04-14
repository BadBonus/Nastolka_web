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
    :ui="{
      header: 'flex items-center justify-between',
      content: 'max-w-[310px] ring-0',
      description: 'text-dark-blue font-secondary',
      container: 'gap-2 pt-0 pl-2',
    }"
    direction="right"
    id="reka-dialog-content-v-0-1"
  >
    <UButton color="secondary">
      <Icon name="ci:hamburger-lg" />
    </UButton>

    <template #header>
      <UsersDrawerBaseInfo v-if="isAuth" />
    </template>

    <template #body>
      <Button
        icon="i-lucide-x"
        color="secondary"
        variant="filled"
        @click="open = false"
        only-icon
        size="sm"
        class="absolute! top-3 right-2"
      />
      <component :is="bodyComponent" />
      <USeparator class="mt-4" color="secondary" type="solid" />
      <MainNavigation class="mt-4" />
    </template>
  </UDrawer>
</template>
