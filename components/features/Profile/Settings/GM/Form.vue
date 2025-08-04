<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

type TSettingsGMForm = {};

defineOptions({
  name: "GMForm",
});

const toast = useToast();
const state = reactive<TSettingsGMForm>({});

const validate = (state: any): FormError[] => {
  const errors = [];
  // if (!state.name) errors.push({ name: "email", message: "Required" });
  // if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({
    title: "Успех",
    description: "Форма была успешно отправлена.",
    color: "success",
  });
  console.log(event.data);
}

const editorContent = ref(
  "<h1>Привет, Nuxt 3 и TipTap!</h1><p>Это пример интеграции.</p>",
);
</script>
<template>
  <UForm
    :validate="validate"
    :state="state"
    class="w-full space-y-4"
    @submit="onSubmit"
  >
    <div class="text-center">
      <h2 class="text-2xl font-bold">Изменить бэк</h2>
      <modals-change-img title="Смена бэка">
        <button
          class="canEditWrapper border-border shadow-element w-full rounded border-2"
        >
          <NuxtImg
            class="h-36 w-full rounded-xs object-cover"
            src="/images/wod_1.png"
            alt="Ваш бэк"
          />
        </button>
      </modals-change-img>

      <tiptap v-model="editorContent" />
      <pre>{{ editorContent }}</pre>

      <h3>Предпросмотр:</h3>
      <div v-html="editorContent" class="prose-mirror-preview"></div>
    </div>
  </UForm>
</template>

<!--<style lang="scss"></style>-->
