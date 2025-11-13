<script setup lang="ts">
import Message from "./Message.vue";

// 	 type TChatWindow = {

// 	}

defineOptions({
  name: "ChatWindow",
});

const demoMessages = [
  {
    id: 0,
    messageType: "you",
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 1,
    messageType: "another",
    user: {
      avatar: "images/wod_1.png",
      slug: "2222",
      role: "GameMAster",
      name: "CrazyMasterBear",
    },
    time: "20:11",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 0,
    messageType: "you",
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 1,
    messageType: "another",
    user: {
      avatar: "images/wod_1.png",
      slug: "2222",
      role: "GameMAster",
      name: "CrazyMasterBear",
    },
    time: "20:11",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 0,
    messageType: "you",
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 1,
    messageType: "another",
    user: {
      avatar: "images/wod_1.png",
      slug: "2222",
      role: "GameMAster",
      name: "CrazyMasterBear",
    },
    time: "20:11",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 0,
    messageType: "you",
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 1,
    messageType: "another",
    user: {
      avatar: "images/wod_1.png",
      slug: "2222",
      role: "GameMAster",
      name: "CrazyMasterBear",
    },
    time: "20:11",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 0,
    messageType: "you",
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: 1,
    messageType: "another",
    user: {
      avatar: "images/wod_1.png",
      slug: "2222",
      role: "GameMAster",
      name: "CrazyMasterBear",
    },
    time: "20:11",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
];
</script>
<template>
  <section
    class="shadow-element ChatWindow border-border h-[100%] rounded border-2 bg-white"
  >
    <ScrollArea class="h-150 border-none p-0">
      <ul class="flex flex-col gap-3">
        <li>
          <time
            class="block text-center text-[10px] font-bold"
            datetime="2018-07-07"
          >
            25 Июля 2025
          </time>
        </li>
        <li v-for="m in demoMessages" :key="m.id"><Message v-bind="m" /></li>
      </ul>
    </ScrollArea>
  </section>
</template>

<!--<style lang="scss"></style>-->
