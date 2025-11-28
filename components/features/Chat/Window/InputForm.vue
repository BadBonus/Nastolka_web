<script setup lang="ts">
// 	 type TWindowInputForm = {

// 	}

defineOptions({
  name: "WindowInputForm",
});

const message = defineModel<string>();
</script>
<template>
  <form class="WindowInputForm">
    <textarea
      v-model="message"
      class="border-dark-brown h-full w-full rounded border-2 p-1.5"
    />
    <Button
      icon="iconoir:send-diagonal-solid"
      class="mt-3 w-full"
      color="primary"
    >
      Отправить
    </Button>
  </form>
</template>

<!--<style lang="scss"></style>-->
