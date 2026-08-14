<script setup lang="ts">
import DetailsForm from './DetailsForm.vue';
import type { TSettingsDetailsForm } from './DetailsForm.vue';

defineOptions({
  name: 'SettingsMain',
});

defineProps<TSettingsDetailsForm & { avatar: string }>();
</script>
<template>
  <div class="SettingsMain">
    <div class="text-center">
      <h2 class="mb-2 text-xl font-bold">Изменить аватар</h2>
      <modals-change-img title="Смена аватара">
        <button class="canEditWrapper shadow-element border-border relative rounded-full border-2">
          <NuxtImg
            class="bg-brown h-36 w-full min-w-36 rounded-full object-cover"
            src="https://github.com/benjamincanac.png"
            alt="Ваш аватар"
          />
          <Icon class="SettingsMainEditIcon absCenter text-3xl" name="material-symbols:edit-sharp" />
        </button>
      </modals-change-img>
    </div>

    <div class="mt-4 text-center">
      <h2 class="mb-3 text-xl font-bold">Детали вашего профиля</h2>
      <DetailsForm />
    </div>
  </div>
</template>

<style>
.canEditWrapper {
  .SettingsMainEditIcon {
    opacity: 0;
    transition: 0.2s;
  }
  &:hover {
    .SettingsMainEditIcon {
      opacity: 1;
    }
  }
}
</style>
