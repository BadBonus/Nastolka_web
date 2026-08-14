<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import DetailsForm from './DetailsForm.vue';
import type { TSettingsProps } from './DetailsForm.vue';

defineOptions({
  name: 'SettingsMain',
});

export type TSettingsMainProps = TSettingsProps & { avatar?: string };
defineProps<TSettingsMainProps>();

const toast = useToast();
const stateDetailsForm = ref<TSettingsProps>({
  nickname: '',
  timezone: 'UTC',
  email: '',
  fio: undefined,
  about: undefined,
  social_links: undefined,
  availableDays: undefined,
});

const onSubmit = (event: FormSubmitEvent<TSettingsProps>) => {
  // Данные попадают сюда только при успешной валидации Zod
  console.log(event.data);

  toast.add({
    title: 'Успех',
    description: 'Форма была успешно отправлена.',
    color: 'success',
  });
};
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
      <DetailsForm v-model="stateDetailsForm" @submit="onSubmit" />
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
