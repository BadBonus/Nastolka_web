<script setup lang="ts">
defineOptions({
  name: "ProfilePreferences",
});
</script>
<template>
  <section class="ProfilePreferences text-center">
    <h1 class="mb-0 text-2xl font-semibold">Мои предпочтения</h1>
    <div>
      <h2 class="text-xl font-semibold">Платформы с которыми работаю</h2>
      <div>Платформы</div>
    </div>

    <div class="mt-1.5">
      <h2 class="text-xl font-semibold">Системы с которыми работаю</h2>
      <ul class="mt-1 flex justify-center gap-1">
        <li v-for="tag in ['dnd', 'vtm', 'pathfinder']" :key="tag">
          <Tag :value="tag" />
        </li>
      </ul>
    </div>
  </section>
</template>
