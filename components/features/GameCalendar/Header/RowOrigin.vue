<script setup lang="ts">
// 	 type THeaderRowOrigin = {

// 	}

defineOptions({
  name: "HeaderRowOrigin",
});
const isAllVars = defineModel<boolean>("isAllVars");
const search = defineModel<string>();
const searchIsActive = ref(false);
const input = useTemplateRef<HTMLInputElement>("input");

const changeOriginVariants = (AllVariants: boolean) => {
  if (AllVariants) {
    // КОД АПИ
    isAllVars.value = true;
  } else {
    // КОД АПИ
    isAllVars.value = false;
  }
};

onMounted(() => {
  if (input.value.inputRef) {
    input.value.inputRef?.addEventListener("focus", () => {
      searchIsActive.value = true;
    });
    input.value.inputRef?.addEventListener("blur", () => {
      searchIsActive.value = false;
    });
  }
});
</script>
<template>
  <div class="HeaderRowOrigin">
    <div class="mt-3 flex items-center justify-between">
      <UInput
        :class="{
          'w-10': !searchIsActive,
          'w-full': searchIsActive,
        }"
        ref="input"
        trailing
        v-model="search"
        icon="i-lucide-search"
        class="transition-width -emptyIcon duration-300"
      />
      <div
        v-show="!searchIsActive"
        class="text-text-secondary flex items-center gap-6 text-xl"
      >
        <UButton
          @click="changeOriginVariants(true)"
          class="p-1"
          :variant="isAllVars ? 'subtle' : 'ghost'"
          >ВСЕ</UButton
        >
        <div class="divider h-4"></div>
        <UButton
          @click="changeOriginVariants(false)"
          class="p-1"
          :variant="isAllVars ? 'ghost' : 'subtle'"
          >подписки</UButton
        >
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
