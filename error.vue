<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="error_page mt-8 flex flex-col items-center justify-center">
    <h1 v-if="error.statusCode === 404" class="text-2xl font-bold">Как ты сюда попал!? Это не место для тебя!" (404)</h1>

    <div class="error_imgWrapper mt-6 flex h-75 w-75 items-center justify-center overflow-hidden rounded-full bg-white">
      <NuxtImg src="/images/404.webp" alt="404" class="relative w-full" />
    </div>

    <UButton class="mt-6" @click="handleError" size="xl">На главную</UButton>
  </div>
</template>

<style>
.error_page {
  height: 90vh;
}
.error_imgWrapper {
  width: 300px;
  height: 300px;

  img {
    transform: scale(1.8);
    left: -12px;
    top: 40px;
  }
}
</style>
