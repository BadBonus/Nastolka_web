<script setup lang="ts">
defineOptions({
  name: 'CardCost',
});

defineProps<{
  cost?: number;
  costCurrency?: string;
}>();
</script>

<template>
  <div class="Cost">
    <span v-if="cost" class="font-secondary sketchy-border p-1.5 text-xl"> {{ cost }}/{{ costCurrency }}/за сессию </span>
    <span v-else class="font-secondary border-success text-sucborder-success sketchy-border-2 border p-1.5 text-xl">
      FREE DONATION
    </span>
  </div>
</template>
