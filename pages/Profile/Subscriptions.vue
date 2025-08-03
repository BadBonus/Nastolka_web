<script setup lang="ts">
defineOptions({
  name: "ProfileSubscriptions",
});

const tabs = [
  { value: "game-master", label: "Гм-ы" },
  { value: "other", label: "Игры" },
];
const selectedTab = ref<string | number>(tabs[0].value);
</script>
<template>
  <section class="ProfileSubscriptions">
    <h1 class="text-center font-bold">Ваши подписки</h1>
    <UTabs
      :content="false"
      v-model="selectedTab"
      :items="tabs"
      class="ProfileNavigation w-full"
    />
    <ProfileSubscriptionsGms v-if="selectedTab === tabs[0].value" />
    <ProfileSubscriptionsGames v-if="selectedTab === tabs[1].value" />
  </section>
</template>

<!--<style lang="scss"></style>-->
