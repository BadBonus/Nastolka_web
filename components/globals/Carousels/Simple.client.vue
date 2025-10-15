<script setup lang="ts" generic="T extends number | string">
type TCarouselsSimple<T = number | string> = {
  items: T[];
  startIndex?: number;
};

defineOptions({
  name: "CarouselsSimple",
});
const props = defineProps<TCarouselsSimple<T>>();
const emit = defineEmits<{
  (e: "confirm", numeric: T): void;
  (e: "change", numeric: T): void;
}>();

const localSelect = (index: number) => emit("change", props.items[index]);
</script>
<template>
  <UCarousel
    class="border-accented rounded-md border border-solid p-2"
    v-slot="{ item }"
    :items="items"
    :startIndex="startIndex"
    @select="localSelect"
    loop
  >
    <button
      @click="$emit('confirm', item)"
      class="mx-auto block w-fit cursor-pointer text-center"
    >
      {{ item }}
    </button>
  </UCarousel>
</template>

<!--<style lang="scss"></style>-->
