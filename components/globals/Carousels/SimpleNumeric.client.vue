<script setup lang="ts">
type TCarouselsSimpleNumeric = {
  items: number[];
  startIndex?: number;
};

defineOptions({
  name: "CarouselsSimpleNumeric",
});
const props = defineProps<TCarouselsSimpleNumeric>();
const emit = defineEmits<{
  (e: "confirm", numeric: number): void;
  (e: "change", numeric: number): void;
}>();

const localSelect = (index: number) => emit("change", props.items[index]);
</script>
<template>
  <UCarousel
    class="border-accented rounded-md border border-solid p-1"
    v-slot="{ item }"
    :items="items"
    arrows
    :startIndex="startIndex"
    @select="localSelect"
  >
    <button
      @click="$emit('confirm', item)"
      class="block w-full cursor-pointer text-center"
    >
      {{ item }}
    </button>
  </UCarousel>
</template>

<!--<style lang="scss"></style>-->
