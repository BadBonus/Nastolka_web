<script setup lang="ts">
import AuthForm from "./Auth.vue";
import RegForm from "./Reg.vue";

const isReg = ref<boolean>(false);
</script>
<template>
  <h2 class="font-decorate-2 text-secondary text-3xl font-bold">
    {{ isReg ? "Регистрация" : "Авторизация" }}
  </h2>
  <KeepAlive>
    <RegForm v-if="isReg" />
    <AuthForm v-else />
  </KeepAlive>
  <Button
    @click="isReg = !isReg"
    type="button"
    size="sm"
    variant="ghost"
    color="secondary"
    class="mt-3 w-full justify-center text-xs!"
  >
    {{ isReg ? "Авторизоваться" : "Зарегистрироваться" }}
  </Button>
</template>

<!--<style lang="scss"></style>-->
