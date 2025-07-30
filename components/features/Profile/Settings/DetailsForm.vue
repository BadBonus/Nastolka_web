<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { popularTimezones } from "~/shared/timezones";
import {
  EDays,
  type TDataAvaCalendar,
} from "@/components/globals/AvailibilityCalendar/types";
// 	 type TSettingsDetailsForm = {

// 	}

type TSettingsDetailsForm = {
  nickname: string;
  fio: string;
  timezone: string;
  email: string;
  about: string | number;
  availableDays: TDataAvaCalendar;
};

defineOptions({
  name: "SettingsDetailsForm",
});

const state = reactive<TSettingsDetailsForm>({
  nickname: "",
  fio: "",
  timezone: "",
  email: "",
  about: "",
  availableDays: null,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  // if (!state.name) errors.push({ name: "email", message: "Required" });
  // if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({
    title: "Успех",
    description: "Форма была успешно отправлена.",
    color: "success",
  });
  console.log(event.data);
}
</script>
<template>
  <UForm
    :validate="validate"
    :state="state"
    class="w-full space-y-4"
    @submit="onSubmit"
  >
    <div class="flex gap-4">
      <UFormField label="Ник" name="nickname">
        <UInput class="w-full" type="text" v-model="state.nickname" />
      </UFormField>

      <UFormField label="ФИО" name="fio">
        <UInput class="w-full" v-model="state.fio" type="text" />
      </UFormField>
    </div>

    <u-form-field label="Временная зона" name="timezone">
      <USelectMenu
        class="w-full"
        v-model="state.timezone"
        value-key="offset"
        :items="popularTimezones"
      />
    </u-form-field>

    <div class="flex items-end gap-4">
      <UFormField label="Email" name="email">
        <UInput class="w-full" v-model="state.email" type="text" />
      </UFormField>

      <PopupDatePicker />
    </div>
    <UFormField label="О себе" name="about">
      <UTextarea class="w-full" v-model="state.about" />
    </UFormField>

    <div>
      <span class="mb-3 block text-center text-xl">
        Доступное время для игр
      </span>
      <AvailibilityCalendar v-model="state.availableDays" />
    </div>

    <Button type="submit"> Сохранить изменения </Button>
  </UForm>
</template>

<!--<style lang="scss"></style>-->
