<script setup lang="ts" generic="T">
import Splide, { type Options } from "@splidejs/splide";

const props = defineProps<{
  options?: Partial<Options>;
  slides: T[];
}>();

const defaultOptions: Partial<Options> = {
  arrows: false,
};

defineSlots<{ slide: T }>();

const splideRoot = ref<HTMLElement | null>(null);
const splideInstance = ref<Splide | null>(null);

function goPrev() {
  splideInstance.value?.go("<");
}

function goNext() {
  splideInstance.value?.go(">");
}

onMounted(() => {
  if (splideRoot.value) {
    const mergedOptions = {
      ...defaultOptions,
      ...(props.options ?? {}),
    };

    splideInstance.value = new Splide(splideRoot.value, mergedOptions).mount();
  }
});
</script>

<template>
  <section class="relative">
    <div ref="splideRoot" class="splide min-h-6 w-full">
      <div class="splide__track w-full">
        <ul class="splide__list">
          <li
            v-for="(slide, index) in slides"
            :key="index"
            class="splide__slide"
          >
            <slot name="slide" :slide="slide" />
          </li>
        </ul>
      </div>
    </div>

    <button class="-prev custom-arrow left-0" @click="goPrev">
      <Icon
        name="fluent-mdl2:caret-left-solid-8"
        class="block rounded-full bg-[red] p-1"
      />
    </button>
    <button class="-next custom-arrow right-0" @click="goNext">
      <Icon
        name="fluent-mdl2:caret-right-solid-8"
        class="block rounded-full bg-[red] p-1"
      />
    </button>
  </section>
</template>

<style>
.custom-arrow {
  position: absolute;
  height: 100%;
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  color: var(--color-white);
  transition: 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.splide__pagination {
  bottom: -1.5rem;
}
</style>
