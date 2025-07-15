<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

defineOptions({
  name: "AuthForm",
});

const schema = z.object({
  email: z.string().email("Неккоректный имейл"),
  password: z.string().min(8, "Минимум 8 символов"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
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
    <UFormField label="Email" name="email">
      <UInput class="w-full" v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput class="w-full" v-model="state.password" type="password" />
    </UFormField>

    <Button class="w-full justify-center font-semibold" type="submit">
      Авторизоваться
    </Button>
  </UForm>
</template>

<!-- <style lang="scss"></style> -->
