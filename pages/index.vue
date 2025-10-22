<script setup lang="ts">
defineOptions({
  name: "PagesIndex",
});

const demoMessage = {
  title: "GM RAH - Bear",
  lastTime: new Date(2024),
  lastMessage:
    "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
  avatar: "images/wod_1.png",
};
</script>

<template>
  <div>
    <ChatItem v-bind="demoMessage" />
  </div>
</template>
