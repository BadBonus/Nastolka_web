<script setup lang="ts">
import { demoArrayOfInitMessages } from "~/shared/demo/chats";

defineOptions({
  name: "ChatIndex",
});

const tabs = [
  { value: "direct", name: "Личные" },
  { value: "games", name: "Игры" },
  { value: "events", name: "События" },
];

const currentTab = ref<string>("direct");

const messages = demoArrayOfInitMessages;

// NOTE: потом настроить лоигику получения данных в зависимости от выбранной вкладки
</script>

<template>
  <section class="Index">
    <header>
      <Tabs v-model="currentTab" class="text-center" :tabs="tabs" />
    </header>
    <section class="mt-5">
      <ul class="flex flex-col gap-2.5">
        <li v-for="m in messages" :key="m.id">
          <NuxtLink :to="'/chat/' + m.id">
            <ChatItem v-bind="m" />
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>
