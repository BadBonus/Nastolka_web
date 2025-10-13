<script setup lang="ts">
// 	 type THeaderRowOrigin = {

// 	}

defineOptions({
  name: "HeaderRowOrigin",
});
const isAllVars = defineModel<boolean>("isAllVars");
const search = defineModel<string | number | undefined>();
const searchIsActive = ref(false);
const sortFromTopTobottom = ref<boolean>(true);
const fullWidthInput = computed<boolean>(
  () => searchIsActive.value || !!search.value,
);

const changeOriginVariants = (AllVariants: boolean) => {
  if (AllVariants) {
    // КОД АПИ
    isAllVars.value = true;
  } else {
    // КОД АПИ
    isAllVars.value = false;
  }
};

const input = useTemplateRef("searchInput");
const onFocus = () => {
  searchIsActive.value = true;
};
const onBlur = () => {
  searchIsActive.value = false;
};

onMounted(() => {
  const nativeElement = input.value?.inputRef;
  console.log(nativeElement);

  if (nativeElement) {
    nativeElement.addEventListener("focus", onFocus);
    nativeElement.addEventListener("blur", onBlur);
  }
});

onUnmounted(() => {
  // Обязательно удаляем слушатели
  const nativeElement = input.value?.input;
  if (nativeElement) {
    nativeElement.removeEventListener("focus", onFocus);
    nativeElement.removeEventListener("blur", onBlur);
  }
});
</script>
<template>
  <div class="HeaderRowOrigin">
    <div class="mt-3 flex items-center justify-between">
      <UInput
        ref="searchInput"
        :class="{
          'w-10': !fullWidthInput,
          'w-full': fullWidthInput,
        }"
        trailing
        v-model="search"
        icon="i-lucide-search"
        class="transition-width -emptyIcon duration-300"
      />

      <div
        v-show="!fullWidthInput"
        class="text-text-secondary flex items-center gap-6 text-xl"
      >
        <Button
          @click="changeOriginVariants(true)"
          class="p-1"
          size="sm"
          :variant="isAllVars ? 'filled' : 'ghost'"
          >ВСЕ</Button
        >
        <div class="divider h-4"></div>
        <Button
          @click="changeOriginVariants(false)"
          class="p-1"
          size="sm"
          :variant="isAllVars ? 'ghost' : 'filled'"
          >подписки</Button
        >

        <Button
          only-icon
          class="flex w-auto justify-center px-1"
          variant="filled"
          icon="heroicons-solid:bars-arrow-up"
        />
      </div>
    </div>
  </div>
</template>

<style>
.-emptyIcon {
  span {
    pointer-events: none;
  }
}
</style>
