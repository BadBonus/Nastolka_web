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
      variant="ghost"
      icon="i-lucide-chevron-left"
      @click="$emit('changeViaArrow', 'left')"
      aria-label="Предыдущий элемент"
      size="sm"
      class="px-0!"
    />

    <ul class="ItemsPickSelector text-text flex w-full justify-between">
      <li v-for="item in items" :key="item.id">
        <button
          :class="{
            'text-dark-blue font-bold opacity-100': item.active,
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
      icon="i-lucide-chevron-right"
      @click="$emit('changeViaArrow', 'right')"
      aria-label="Следующий элемент"
      size="sm"
      variant="ghost"
      class="px-0!"
    />
  </div>
</template>
