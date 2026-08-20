<script setup lang="ts">
import { popularTimezones } from '#consts/timezones';
import { settingsDetailsFormSchema } from './schemas/details-form.schema';

export type TSettingsProps = {
  nickname: string;
  timezone: string;
  email: string;
  fio?: string;
  about?: string;
  social_links?: Record<string, string | undefined>;
  availableDays?: Array<{ dayOfWeek: number; startTime: number; endTime: number }>;
  birthdate?: Date;
};

defineOptions({ name: 'SettingsDetailsForm' });
const state = defineModel<TSettingsProps>({ required: true });
const emit = defineEmits<{
  (event: 'submit', data: TSettingsProps): void;
}>();

const submit = () => {
  emit('submit', state.value);
};
</script>

<template>
  <UForm :schema="settingsDetailsFormSchema" :state="state" class="w-full space-y-4" @submit="submit">
    <div class="flex gap-4">
      <UFormField label="Ник" name="nickname">
        <UInput disabled class="w-full" type="text" v-model="state.nickname" />
      </UFormField>

      <UFormField label="ФИО" name="fio">
        <UInput class="w-full" type="text" v-model="state.fio" />
      </UFormField>
    </div>

    <UFormField label="Временная зона" name="timezone">
      <USelectMenu class="w-full" v-model="state.timezone" value-key="offset" label-key="label" :items="popularTimezones" />
    </UFormField>

    <div class="flex items-end gap-4">
      <UFormField label="Email" name="email">
        <UInput disabled class="w-full" type="text" v-model="state.email" />
      </UFormField>

      <PopupDatePicker v-model="state.birthdate" label="Ваш д.р." />
    </div>

    <UFormField label="О себе" name="about">
      <UTextarea class="w-full" v-model="state.about" />
    </UFormField>

    <div>
      <span class="mb-3 block text-center text-xl">Доступное время для игр</span>
      <AvailibilityCalendar v-model="state.availableDays" />
    </div>

    <SocLinksInput class="mt-5" v-model="state.social_links" />

    <UButton class="mx-auto mt-3" type="submit">Сохранить изменения</UButton>
  </UForm>
</template>
