<script generic="T" setup lang="ts">
// FIXME потом передалть в глобалку
type TItemsPickSelectorItem = T & {
  id: string;
  name: string;
  addInfo?: string | number;
  active?: boolean;
  outOfRange?: boolean;
  [key: string]: any;
};
type TItemsPickSelector = {
  items: TItemsPickSelectorItem[];
};

defineOptions({
  name: "ItemsPickSelector",
});
defineProps<TItemsPickSelector>();
defineEmits<{
  (e: "change", numeric: TItemsPickSelectorItem): void;
  (e: "changeViaArrow", side: "left" | "right"): void;
}>();
</script>
<template>
  <div class="flex w-full items-center justify-between gap-3">
    <UButton
      variant="outline"
      class="h-full"
      size="xl"
      icon="i-lucide-chevron-left"
      @click="$emit('changeViaArrow', 'left')"
    />

    <ul class="ItemsPickSelector flex w-full justify-between text-[E2E8F0]">
      <li v-for="item in items" :key="item.id">
        <button
          :class="{
            'font-bold text-white opacity-100': item.active,
            'opacity-15': item.outOfRange,
            'opacity-80': !item.outOfRange,
          }"
          class="flex flex-col items-center duration-150 hover:opacity-100"
          @click="$emit('change', item)"
        >
          <span class="text-2xl">{{ item.name }}</span>
          <span>{{ item.addInfo }}</span>
        </button>
      </li>
    </ul>
    <UButton
      variant="outline"
      class="h-full"
      size="xl"
      icon="i-lucide-chevron-right"
      @click="$emit('changeViaArrow', 'right')"
    />
  </div>
</template>

<style>
.ItemsPickSelector {
  li button span:first-child:first-letter {
    text-transform: uppercase;
  }
}
</style>
