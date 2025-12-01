<script setup lang="ts">
import { input } from "#build/ui";
import type { TModalsDialog } from "@/components/globals/modals/Dialog.client.vue";

defineOptions({
  name: "Chat_id",
});

const demoUsers = [
  {
    avatar: "/images/wod_1.png",
    slug: "blablabla",
  },
  {
    avatar: "/images/wod_1.png",
    slug: "blablabla2",
  },
  {
    avatar: "/images/wod_1.png",
    slug: "blablabla3",
  },
  {
    avatar: "/images/wod_1.png",
    slug: "blablabl4",
  },
  {
    avatar: "/images/wod_1.png",
    slug: "blablabla5",
  },
  {
    avatar: "/images/wod_1.png",
    slug: "blablabl6a",
  },
];

const reportDialogOpts: TModalsDialog = {
  title: "Пожаловаться",
  descr: "Через эту форму вы можете передать жалобу на гейм-мастера",
  actionText: "Отправить",
};

const state = reactive({
  text: "",
});

const onSubmit = () => {
  // TODO: логика отправки жалобы на сервер
  console.log("запрос отправлен");
};
</script>

<template>
  <section class="Chat_id">
    <header>
      <div class="flex justify-between">
        <ModalsDialog v-bind="reportDialogOpts">
          <Button
            rounded
            onlyIcon
            icon="material-symbols:report"
            color="danger"
          />

          <template #inContent>
            <UForm :state="state" class="space-y-4" @submit="onSubmit">
              <UFormField name="text">
                <UInput
                  class="w-full"
                  v-model="state.text as string"
                  type="text"
                />
              </UFormField>
            </UForm>
          </template>
        </ModalsDialog>
        <NuxtLink to="/chat">
          <Button
            onlyIcon
            icon="material-symbols:keyboard-return-rounded"
            class="mx-auto"
          />
        </NuxtLink>
      </div>

      <h1 class="mb-0 text-center text-xl font-semibold">
        GM Rah - Bear and Артур Есипов
      </h1>

      <PopupUsersList :users="demoUsers">
        <button class="mx-auto flex items-center text-2xl">
          <Icon name="ic:baseline-people-outline" />
          <span class="text-xl">:22</span>
        </button>
      </PopupUsersList>
    </header>

    <ChatWindow />
  </section>
</template>

<!-- <style lang="scss"></style> -->
