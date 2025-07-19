<script generic="T" setup lang="ts">
// FIXME потом передалть в глобалку
type TItemsPickSelectorItem = T & {
  id: string;
  name: string;
  addInfo?: string | number;
  active?: boolean;
  outOfRange?: boolean;
  [itemKey: string]: any;
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
    <Button
      variant="filled"
      icon="i-lucide-chevron-left"
      @click="$emit('changeViaArrow', 'left')"
      aria-label="Предыдущий элемент"
    />

    <ul class="ItemsPickSelector text-text flex w-full justify-between">
      <li v-for="item in items" :key="item.id">
        <button
          :class="{
            'text-gold font-bold opacity-100': item.active,
            'opacity-15': item.outOfRange,
            'opacity-80': !item.outOfRange,
          }"
          class="flex flex-col items-center duration-150 hover:opacity-100"
          @click="$emit('change', item)"
        >
          <span class="text-2xl capitalize">{{ item.name }}</span>
          <span>{{ item.addInfo }}</span>
        </button>
      </li>
    </ul>
    <Button
      variant="filled"
      icon="i-lucide-chevron-right"
      @click="$emit('changeViaArrow', 'right')"
      aria-label="Следующий элемент"
    />
  </div>
</template>
