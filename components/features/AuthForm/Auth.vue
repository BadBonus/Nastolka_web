<script setup lang="ts">
import {
  loginUserSchema,
  type TLoginUserSchema,
} from "~/shared/types/validationSchemas/auth/login";
import useAuthFlow from "~/composables/use-cases/useAuthFlow";
import type { FormSubmitEvent } from "@nuxt/ui";

defineOptions({
  name: "AuthForm",
});

const state = reactive<Partial<TLoginUserSchema>>({
  email: "gggggg@gmail.com",
  password: "testesttest",
});
const isFormValid = computed(() => loginUserSchema.safeParse(state).success);
const { login, isLoading } = useAuthFlow();

async function onSubmit(event: FormSubmitEvent<TLoginUserSchema>) {
  try {
    await login(event.data);
  } catch (error) {
    return;
  }
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
      color="secondary"
    >
      Авторизоваться
    </Button>
  </UForm>
</template>
