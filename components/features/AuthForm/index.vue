<script setup lang="ts">
import AuthForm from "./Auth.vue";
import RegForm from "./Reg.vue";

const isReg = ref<boolean>(false);

const toggleAuthForm = () => {
  isReg.value = !isReg.value;
};
</script>
<template>
  <h2 class="font-decorate-2 text-default text-3xl font-bold mb-5">
    {{ isReg ? "Регистрация" : "Авторизация" }}
  </h2>
  <KeepAlive>
    <RegForm v-if="isReg" />
    <AuthForm v-else />
  </KeepAlive>
  <UButton
    @click="toggleAuthForm"
    type="button"
    size="sm"
    variant="ghost"
    class="mt-3 w-full justify-center text-xs!"
  >
    {{ isReg ? "Авторизоваться" : "Зарегистрироваться" }}
  </UButton>
</template>

<!--<style lang="scss"></style>-->
