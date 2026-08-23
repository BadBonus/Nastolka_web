<script setup lang="ts">
import Message from "./Message.vue";
import InputForm from "./InputForm.vue";
import type { TChatWindowMessage } from "./Message.vue";

enum EMessageHost {
  you = 'you',
  another = 'another',
}

defineOptions({
  name: "ChatWindow",
});

const demoMessages: (TChatWindowMessage & { id: string })[] = [
  {
    id: '0',
    messageType: EMessageHost.you,
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: '1',
    messageType: EMessageHost.another,
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
    id: '2',
    messageType: EMessageHost.you,
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: '3',
    messageType: EMessageHost.another,
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
    id: '4',
    messageType: EMessageHost.you,
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: '5',
    messageType: EMessageHost.another,
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
    id: '6',
    messageType: EMessageHost.you,
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: '7',
    messageType: EMessageHost.another,
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
    id: '8',
    messageType: EMessageHost.you,
    user: {
      avatar: "images/wod_1.png",
      slug: "100500",
    },
    time: "20:10",
    message:
      "lorem loremloremloremloremloremlorem lorem  loremloremloremloremloremloremloremloremloremlorem loremlorem lorem",
  },
  {
    id: '9',
    messageType: EMessageHost.another,
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
    class="shadow-element ChatWindow border-border h-[100%] rounded border-2 bg-white pb-2"
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
    <InputForm class="mx-auto mt-4 block w-[90%]" />
  </section>
</template>

<!--<style lang="scss"></style>-->
