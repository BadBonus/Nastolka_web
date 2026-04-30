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
    <h3 class="-truncate w-32.25 text-lg font-semibold">User Name</h3>
  </NuxtLink>
</template>

<!--<style lang="scss"></style>-->
