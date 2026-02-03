<script setup lang="ts">
import {
  loginUserSchema,
  type TLoginUserSchema,
} from "@/shared/validationSchemas/login";
import type { FormSubmitEvent } from "@nuxt/ui";

defineOptions({
  name: "AuthForm",
});

const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref(false);
const state = reactive<Partial<TLoginUserSchema>>({
  email: undefined,
  password: undefined,
});
const isFormValid = computed(() => loginUserSchema.safeParse(state).success);

async function onSubmit(event: FormSubmitEvent<TLoginUserSchema>) {
  isLoading.value = true;
  try {
    await authStore.login(event.data);
  } catch (error) {
    return;
  } finally {
    isLoading.value = false;
  }

  toast.add({
    title: "Успех",
    description: "Авторизован",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <UForm
    :schema="loginUserSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput class="w-full" v-model="state.email as string" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput
        class="w-full"
        v-model="state.password as string"
        type="password"
      />
    </UFormField>

    <Button
      :loading="isLoading"
      class="w-full justify-center font-semibold"
      type="submit"
      :disabled="!isFormValid"
    >
      Авторизоваться
    </Button>
  </UForm>
</template>
