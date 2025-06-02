<script setup lang="ts">
import AuthForm from "./Auth.vue";
import RegForm from "./Reg.vue";

const isReg = ref<boolean>(false);
</script>
<template>
  <RegForm v-if="isReg" />
  <AuthForm v-else />
  <UButton
    @click="isReg = !isReg"
    type="button"
    size="sm"
    variant="link"
    class="mt-3 w-full justify-center text-xs!"
  >
    {{ isReg ? "Авторизоваться" : "Зарегистрироваться" }}
  </UButton>
</template>

<!--<style lang="scss"></style>-->
