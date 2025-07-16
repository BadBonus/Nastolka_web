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
const sortFromTopTobottom = ref<boolean>(true);

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
  // if (input.value) {
  //   input.value.addEventListener("focus", () => {
  //     searchIsActive.value = true;
  //   });
  //   input.value.addEventListener("blur", () => {
  //     searchIsActive.value = false;
  //   });
  // }
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
        <Button
          @click="changeOriginVariants(true)"
          class="p-1"
          size="sm"
          :variant="isAllVars ? 'outline' : 'ghost'"
          >ВСЕ</Button
        >
        <div class="divider h-4"></div>
        <Button
          @click="changeOriginVariants(false)"
          class="p-1"
          size="sm"
          :variant="isAllVars ? 'ghost' : 'outline'"
          >подписки</Button
        >

        <Button
          class="inline-block px-3"
          variant="outline"
          color="primary"
          :icon="`lucide:arrow-${sortFromTopTobottom ? 'down' : 'up'}-narrow-wide`"
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
