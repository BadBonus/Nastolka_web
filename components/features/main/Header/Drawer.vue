<script setup lang="ts">
import { AuthForm, UsersDrawerNav } from '#components';

defineOptions({
  name: 'HeaderDrawer',
});

const props = withDefaults(defineProps<{ isAuth?: boolean }>(), {
  isAuth: false,
});

const open = ref<boolean>(false);
const route = useRoute();
const bodyComponent = computed(() => (props.isAuth ? UsersDrawerNav : AuthForm));
const switchStateOpen = () => {
  open.value = !open.value;
};

watch(
  () => route.name,
  () => {
    open.value = false;
  }
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
    <UButton variant="ghost" class="text-inverted">
      <Icon class="text-3xl" name="ci:hamburger" />
    </UButton>

    <template #header>
      <UsersDrawerBaseInfo class="mt-1.5" v-if="isAuth" />
    </template>

    <template #body>
      <UButton
        icon="i-lucide-x"
        variant="ghost"
        @click="switchStateOpen"
        only-icon
        size="xl"
        class="absolute! top-4 right-4 p-0"
      />
      <component :is="bodyComponent" />
      <USeparator class="mt-4" type="solid" />
      <MainNavigation class="mt-4" />
    </template>
  </UDrawer>
</template>
