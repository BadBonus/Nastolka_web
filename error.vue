<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="error_page mt-8 flex h-[90vh] flex-col items-center justify-center">
    <div class="w-fit">
      <h1 v-if="error.statusCode === 404" class="text-2xl font-bold">Вы встретили орка! Сюда вам еще рано!" (404)</h1>

      <div class="bg-card-decorate mx-auto mt-6 w-fit rounded-xl p-1">
        <div
          class="error_imgWrapper border-background flex w-75 flex-col items-center justify-center rounded-lg border-2 border-dashed"
        >
          <NuxtImg src="/images/404.webp" alt="404" class="relative w-full" />

          <UButton color="neutral" variant="outline" class="my-3" @click="handleError" size="xl">На главную</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
