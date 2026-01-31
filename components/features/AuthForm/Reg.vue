<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { registerUserSchema } from "~/shared/validationSchemas/user";

type Schema = z.output<typeof schema>;
defineOptions({
  name: "MainRegForm",
});

const schema = registerUserSchema;
const state = reactive<Partial<Schema>>({
  nickname: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Успех",
    description: "Авторизован",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Nickname" name="nickname">
      <UInput class="w-full" v-model="state.nickname" />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput class="w-full" v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput class="w-full" v-model="state.password" type="password" />
    </UFormField>

    <UFormField label="Repeat Password" name="confirmPassword">
      <UInput class="w-full" v-model="state.confirmPassword" type="password" />
    </UFormField>

    <Button class="w-full justify-center font-semibold" type="submit">
      Зарегистрироваться
    </Button>
  </UForm>
</template>
