<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { popularTimezones } from "~/shared/timezones";
import {
  EDays,
  type TDataAvaCalendar,
} from "@/components/globals/AvailibilityCalendar/types";
import type { TSoclinksObject } from "~/types/global";
import { initSocLinks } from "~/utils/soclinks";
// 	 type TSettingsDetailsForm = {

// 	}

type TSettingsDetailsForm = {
  nickname: string;
  fio: string;
  timezone: string;
  email: string;
  gameStyle: string | number;
  availableDays: TDataAvaCalendar;
  // tabletop_exp_age: EExpYears;
  gm_style?: string;
  social_links: TSoclinksObject;
};

defineOptions({
  name: "PagesBecomegm",
});

const state = reactive<TSettingsDetailsForm>({
  nickname: "",
  fio: "",
  timezone: "",
  email: "",
  gameStyle: "",
  availableDays: null,
  // tabletop_exp_age: EExpYears.less,
  gm_style: "",
  social_links: initSocLinks,
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
    <div class="flex">
      <UFormField class="w-full" label="Ник" name="nickname">
        <UInput class="w-full" type="text" v-model="state.nickname" />
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

    <UFormField label="Как вы проводите игры?" name="gameStyle">
      <UTextarea class="w-full" v-model="state.gameStyle" />
    </UFormField>

    <SocLinksInput v-model="state.social_links" />

    <Button class="mx-auto" type="submit"> Сохранить изменения </Button>
  </UForm>
</template>

<!-- <style lang="scss"></style> -->
