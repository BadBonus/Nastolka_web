<script setup lang="ts">
// 	 type TUsersDrawerInfo = {

// 	}

defineOptions({
  name: "UsersDrawerBaseInfo",
});
</script>
<template>
  <NuxtLink to="/profile" class="UsersDrawerBaseInfo flex items-center gap-1.5">
    <UAvatar src="/images/wod_1.png" class="border-border h-14 w-14 border-2" />
    <div class="text-inverted">
      <h3 class="text-lg font-bold">User Name</h3>
      <p class="text-sm">user@example.com</p>
    </div>
  </NuxtLink>
</template>

<!--<style lang="scss"></style>-->
