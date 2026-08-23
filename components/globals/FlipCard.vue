<script setup lang="ts">
import { cn } from '@inspira-ui/plugins';
import { computed, ref } from 'vue';

interface FlipCardProps {
  rotate?: 'x' | 'y';
  trigger?: 'hover' | 'click';
  class?: string;
  isFlipped?: boolean;
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: 'y',
  trigger: 'hover',
});

const isFlipped = ref(false);

const flipstate = computed(() => {
  if (props.isFlipped !== undefined) return props.isFlipped;
  else return isFlipped.value;
});

const toggleFlip = () => {
  if (props.trigger === 'click') {
    isFlipped.value = !isFlipped.value;
  }
};

const transformClass = computed(() => {
  const axis = props.rotate === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)';
  return `transform-[${axis}]`;
});

const containerRotation = computed(() => {
  if (props.trigger === 'click') {
    return flipstate.value ? transformClass.value : '';
  }
  return `group-hover:${transformClass.value}`;
});
</script>

<template>
  <div
    :class="cn('group perspective-[1000px]', props.trigger === 'click' && 'cursor-pointer', props.class)"
    @click="toggleFlip"
  >
    <div :class="cn('relative h-full rounded-2xl transition-all duration-500 transform-3d', containerRotation)">
      <!-- Front -->
      <div class="absolute size-full overflow-hidden rounded-2xl border backface-hidden">
        <slot />
      </div>

      <!-- Back -->
      <div
        :class="
          cn('absolute h-full w-full overflow-hidden rounded-2xl border text-slate-200 backface-hidden', transformClass)
        "
      >
        <slot name="back" />
      </div>
    </div>
  </div>
</template>
