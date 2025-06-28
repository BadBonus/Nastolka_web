<script setup lang="ts" generic="T extends string | number | null | undefined">
type TModalFiltersRangeInput = {
  label?: string;
  placeholder?: string;
  type?: string;
};
withDefaults(defineProps<TModalFiltersRangeInput>(), {
  type: "number",
});
defineOptions({
  name: "ModalFiltersRangeInput",
});
const model = defineModel<T[]>({
  default: () => [0, 0],
});
</script>
<template>
  <div>
    <span class="block text-xl"> {{ $props.label }}</span>
    <div class="mt-2 flex gap-3">
      <UInput v-model="model[0]" :type="$props.type" icon="i-lucide-at-sign">
        <template #leading>
          <p class="text-muted text-sm">От:</p>
        </template>
      </UInput>

      <UInput :type="$props.type" v-model="model[1]">
        <template #leading>
          <p class="text-muted text-sm">До:</p>
        </template>
      </UInput>
    </div>
  </div>
</template>

<!--<style lang="scss"></style>-->
