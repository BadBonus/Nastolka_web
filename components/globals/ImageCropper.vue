<script setup lang="ts">
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import type { CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export type TImageCropper = {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  recomendation?: string;
  canvasHeight?: number;
  isCircleStencil?: boolean;
};

export type TModifiedCropperResult = CropperResult & {
  file: File;
};

const props = withDefaults(defineProps<TImageCropper>(), {
  canvasHeight: 200,
  minWidth: 100,
  minHeight: 100,
  maxWidth: 2000,
  maxHeight: 2000,
});

const cropperRef = useTemplateRef('cropperRef');
const isDragOver = ref<boolean>(false);
const imgFile = ref<File | null>(null);
const img = ref<null | string>(null);

const emit = defineEmits<{
  (e: 'confirm', data: TModifiedCropperResult): void;
}>();

const takeImg = async (event: Event) => {
  isDragOver.value = false;
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    const file = target.files[0];
    if (!file) return;
    const cookedImg = await toBase64(file);
    imgFile.value = target.files[0] ?? null;
    img.value = cookedImg;
  }
};

const rotate = (angle: number) => {
  if (cropperRef.value) cropperRef.value.rotate(angle);
};

const sizeRestrictions = () => ({
  minWidth: props.minWidth ?? 100,
  minHeight: props.minHeight ?? 100,
  maxWidth: props.maxWidth ?? 300,
  maxHeight: props.maxHeight ?? 300,
});

const submit = () => {
  if (cropperRef.value)
    emit('confirm', {
      ...cropperRef.value?.getResult(),
      file: imgFile.value as File,
    });
};
</script>

<template>
  <div @dragenter.prevent="isDragOver = true" @dragleave.prevent="isDragOver = false" class="ImageCropper relative">
    <div class="inputImageArea text-inverted h-15 w-full">
      <input
        @dragenter.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        type="file"
        accept="image/*"
        @change="takeImg"
      />
      <div class="flex h-full items-center justify-center">
        <Icon class="text-2xl" name="material-symbols-light:upload" />
        <span class="text-lg"> Перетащи </span>
      </div>
    </div>

    <span class="text-sm text-black">
      {{ recomendation }}
    </span>

    <div class="relative">
      <div
        :style="{
          height: canvasHeight + 'px',
        }"
        class="relative top-2 flex items-center border-2 border-dashed border-black"
      >
        <span v-if="!img" class="abscenter inset-0 m-auto h-fit w-fit"> Перетащи </span>
        <input
          class="abscenter"
          @dragenter.prevent="isDragOver = true"
          @dragleave.prevent="isDragOver = false"
          type="file"
          accept="image/*"
          @change="takeImg"
          v-if="!img"
        />
        <cropper
          v-if="img"
          ref="cropperRef"
          :stencil-component="isCircleStencil ? CircleStencil : undefined"
          :size-restrictions-algorithm="sizeRestrictions"
          class="cropper h-full w-full"
          :src="img"
          image-restriction="fit-area"
        />
      </div>

      <div class="absolute right-3 bottom-3 z-10 flex gap-2" v-if="img">
        <button @click="rotate(-90)" class="bg-bg-2 text-inverted flex items-center justify-center rounded-lg p-1">
          <Icon class="text-xl text-white" name="ph:arrow-arc-left" />
        </button>
        <button @click="rotate(90)" class="bg-bg-2 text-inverted flex items-center justify-center rounded-lg p-1">
          <Icon class="text-xl text-white" name="ph:arrow-arc-right" />
        </button>
      </div>
    </div>

    <span :class="{ 'opacity-0': !img }" class="text-primary mt-3 block text-sm"> Совет </span>

    <UButton color="success" :disabled="!img" class="mt-4 w-full justify-center" size="lg" @click="submit">
      Сохранить
    </UButton>
  </div>
</template>

<style scoped>
.ImageCropper {
  .vue-simple-line {
    border-color: var(--color-primary);
    border-style: dashed;
  }

  .vue-preview {
    border: 2px solid white;
  }

  .vue-advanced-cropper__background,
  .vue-advanced-cropper__foreground,
  .vue-advanced-cropper__image-wrapper {
    border-radius: 4px;
  }

  .inputImageArea {
    border-radius: 4px;
    background: var(--color-primary);
    position: relative;
    border: 2px solid var(--color-secondary);
    transition: 0.2s;
    color: var(--text-color-inverted);

    &:has(input:hover) {
      background: var(--color-black/40);
    }
  }

  input[type='file'] {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
  }
}
</style>
