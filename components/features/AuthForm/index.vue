<script setup lang="ts">
import AuthForm from "./Auth.vue";
import RegForm from "./Reg.vue";

const isReg = ref<boolean>(false);
</script>
<template>
  <KeepAlive>
    <RegForm v-if="isReg" />
    <AuthForm v-else />
  </KeepAlive>
  <Button
    @click="isReg = !isReg"
    type="button"
    size="sm"
    variant="ghost"
    class="mt-3 w-full justify-center text-xs!"
  >
    {{ isReg ? "Авторизоваться" : "Зарегистрироваться" }}
  </Button>
</template>

<!--<style lang="scss"></style>-->
