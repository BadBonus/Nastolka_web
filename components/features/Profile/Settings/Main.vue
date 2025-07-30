<script setup lang="ts">
import DetailsForm from "./DetailsForm.vue";
// 	 type TSettingsMain = {

// 	}

defineOptions({
  name: "SettingsMain",
});
</script>
<template>
  <div class="SettingsMain">
    <div class="text-center">
      <h2 class="text-2xl font-bold">Изменить аватар</h2>
      <modals-change-img title="Смена аватара">
        <button
          class="canEditWrapper shadow-element border-border rounded-full border-2"
        >
          <NuxtImg
            class="h-36 w-full rounded-full object-cover"
            src="https://github.com/benjamincanac.png"
            alt="Ваш аватар"
          />
        </button>
      </modals-change-img>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-bold">Изменить бэк</h2>
      <modals-change-img title="Смена бэка">
        <button
          class="canEditWrapper border-border shadow-element w-full rounded border-2"
        >
          <NuxtImg
            class="h-36 w-full rounded-xs object-cover"
            src="/images/wod_1.png"
            alt="Ваш бэк"
          />
        </button>
      </modals-change-img>
    </div>

    <div class="text-center">
      <h2 class="mb-2 text-2xl font-bold">Детали вашего профиля</h2>
      <DetailsForm />
    </div>
  </div>
</template>

<!--<style lang="scss"></style>-->
