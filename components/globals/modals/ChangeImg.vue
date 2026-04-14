<script setup lang="ts">
import type {
  TImageCropper,
  TModifiedCropperResult,
} from "../ImageCropper.vue";
import ImageCropper from "../ImageCropper.vue";

type TModalsChangeImg = {
  title?: string;
  cropperProps?: TImageCropper;
};

defineOptions({
  name: "ModalsChangeImg",
});

defineProps<TModalsChangeImg>();
const emit = defineEmits<{
  (e: "confirm", data: TModifiedCropperResult): void;
}>();
</script>
<template>
  <UModal
    :title="title ?? 'Смена картинки'"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    :ui="{
      content: 'border-3 border-black',
    }"
  >
    <slot />

    <template #body>
      <ImageCropper v-bind="cropperProps" @confirm="emit('confirm', $event)" />
    </template>
  </UModal>
</template>

<!--<style lang="scss"></style>-->
