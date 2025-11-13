<script setup lang="ts">
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
</script>

<template>
  <section class="Chat_id">
    <header>
      <div class="flex justify-between">
        <Button
          rounded
          onlyIcon
          icon="material-symbols:report"
          color="danger"
        />
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
