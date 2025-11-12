<script setup lang="ts">
type TPopupUser = {
  avatar: string;
  slug: string;
};

defineOptions({
  name: "PopupCUsersList",
});

defineProps<{
  users: TPopupUser[];
}>();
</script>

<template>
  <UPopover
    :content="{
      align: 'center',
    }"
  >
    <slot />

    <template #content>
      <ul class="flex w-fit max-w-[195px] flex-wrap gap-1.5 p-1.5">
        <li :key="u.slug" v-for="u in users">
          <NuxtLink :to="'/profile/' + u.slug">
            <UAvatar :src="u.avatar" class="border-border size-9 border-1" />
          </NuxtLink>
        </li>
      </ul>
    </template>
  </UPopover>
</template>
