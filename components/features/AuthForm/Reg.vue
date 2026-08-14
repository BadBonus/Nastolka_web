<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { registerUserSchema, type TRegisterUserSchema } from './schemas/registration-form.schema';
import useAuthFlow from '~/composables/use-cases/useAuthFlow';

const state = reactive<Partial<TRegisterUserSchema>>({
  nickname: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});
const { registerUser } = useAuthFlow();

async function onSubmit(event: FormSubmitEvent<TRegisterUserSchema>) {
  await registerUser(event.data);
}
</script>

<template>
  <UForm :schema="registerUserSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Nickname" name="nickname">
      <UInput class="w-full" v-model="state.nickname as string" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput class="w-full" v-model="state.email as string" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput class="w-full" v-model="state.password as string" type="password" />
    </UFormField>

    <UFormField label="Repeat Password" name="confirmPassword">
      <UInput class="w-full" v-model="state.confirmPassword as string" type="password" />
    </UFormField>

    <UButton class="w-full justify-center font-semibold" type="submit"> Зарегистрироваться </UButton>
  </UForm>
</template>
