<script setup lang="ts">
import type { CSSProperties } from 'vue';

export interface TBadgeListItem {
  shortLabel: string;
  fullLabel?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

defineOptions({
  name: 'BadgeList',
});

defineProps<{
  items: TBadgeListItem[];
}>();

const DEFAULT_TEXT_COLOR = '#000000';
const DEFAULT_BORDER_COLOR = '#000000';
const DEFAULT_BG_COLOR = 'transparent';

const badgeClass =
  'border ring-0 bg-(--badge-bg)! text-(--badge-text)! border-(--badge-border)! focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black';

function getBadgeStyle(item: TBadgeListItem): CSSProperties {
  return {
    '--badge-bg': item.bgColor ?? DEFAULT_BG_COLOR,
    '--badge-text': item.textColor ?? DEFAULT_TEXT_COLOR,
    '--badge-border': item.borderColor ?? DEFAULT_BORDER_COLOR,
  } as CSSProperties;
}
</script>

<template>
  <ul v-if="items.length" class="flex flex-wrap gap-1">
    <li v-for="(item, index) in items" :key="`${item.shortLabel}-${index}`">
      <UTooltip v-if="item.fullLabel" :text="item.fullLabel" :delay-duration="0">
        <UBadge
          as="button"
          type="button"
          color="neutral"
          variant="outline"
          class="cursor-pointer"
          :class="badgeClass"
          :style="getBadgeStyle(item)"
        >
          {{ item.shortLabel }}
        </UBadge>
      </UTooltip>
      <UBadge v-else color="neutral" variant="outline" :class="badgeClass" :style="getBadgeStyle(item)">
        {{ item.shortLabel }}
      </UBadge>
    </li>
  </ul>
</template>
