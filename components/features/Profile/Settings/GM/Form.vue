<script setup lang="ts">
import { EExpYears } from '../types';
import type { FormError, FormSubmitEvent } from '@nuxt/ui';
import { countries } from '#consts/countries';
import { GAME_SYSTEM_BADGES } from '#consts/gameSystems';
import type { ESocLinks } from '#consts/socLinks';
import { GamePlatform, GameSystem } from '#openApi/enums';
import { formatUnderscoreToSpace } from '@/utils/transformers/formatUnderscoreToSpace';
import { initSocLinks } from '~/utils/soclinks';

type TSettingsGMForm = {
  nickname?: string;
  city?: string;
  country?: string;
  zipcode?: string;
  about?: string;
  background?: string;
  avatar?: string;
  gm_exp_age: EExpYears;
  gameStyle?: string;
  social_links: Partial<Record<ESocLinks, string | undefined>>;
  game_platforms: GamePlatform[];
  game_systems: GameSystem[];
  languages: string[];
};

const gameSystemItems = GameSystem.map((value) => ({
  value,
  label: GAME_SYSTEM_BADGES[value].shortLabel,
}));

const gamePlatformItems = GamePlatform.map((value) => ({
  value,
  label: formatUnderscoreToSpace(value),
}));

defineOptions({
  name: 'GMForm',
});

const toast = useToast();
const state = reactive<TSettingsGMForm>({
  languages: [],
  nickname: '',
  city: '',
  country: '',
  zipcode: '',
  about: '',
  background: '',
  avatar: '',
  gm_exp_age: EExpYears.less,
  gameStyle: '',
  social_links: initSocLinks,
  game_platforms: [],
  game_systems: [],
});

const validate = (state: any): FormError[] => {
  const errors: FormError<string>[] = [];
  // if (!state.name) errors.push({ name: "email", message: "Required" });
  // if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({
    title: 'Успех',
    description: 'Форма была успешно отправлена.',
    color: 'success',
  });
  console.log(event.data);
}

const editorContent = ref('');
</script>
<template>
  <UForm :validate="validate" :state="state" class="w-full space-y-4" @submit="onSubmit">
    <UFormField label="Ник мастера" name="nickname">
      <UInput class="w-full" type="text" v-model="state.nickname as string" />
    </UFormField>

    <div class="text-center">
      <h2 class="text-2xl font-bold">Изменить Аватар мастера</h2>
      <modals-change-img title="Смена аватара">
        <button class="canEditWrapper shadow-element border-border rounded-full border-2">
          <NuxtImg
            class="bg-brown h-36 w-full min-w-36 rounded-full object-cover"
            src="https://github.com/benjamincanac.png"
            alt="Ваш аватар"
          />
        </button>
      </modals-change-img>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-bold">Изменить бэк</h2>
      <modals-change-img title="Смена бэка">
        <button class="canEditWrapper border-border shadow-element w-full rounded border-2">
          <NuxtImg class="h-36 w-full rounded-xs object-cover" src="/images/wod_1.png" alt="Ваш бэк" />
        </button>
      </modals-change-img>
    </div>

    <u-form-field label="Языки на котором вы можете вести игры" name="timezone">
      <USelectMenu class="w-full" multiple v-model="state.languages" value-key="offset" :items="['русский', 'английский']" />
    </u-form-field>

    <u-form-field label="Предпочитаемые системы" name="timezone">
      <USelectMenu class="w-full" multiple value-key="value" v-model="state.game_systems" :items="gameSystemItems" />
    </u-form-field>

    <u-form-field label="Предпочитаемые платформы" name="timezone">
      <USelectMenu multiple class="w-full" value-key="value" v-model="state.game_platforms" :items="gamePlatformItems" />
    </u-form-field>

    <div class="flex items-end gap-4">
      <UFormField label="Страна" name="country">
        <USelectMenu class="w-full" v-model="state.country" value-key="name" :items="countries" />
      </UFormField>

      <UFormField label="Город" name="city">
        <UInput class="w-full" v-model="state.city as string" type="text" />
      </UFormField>
    </div>

    <UFormField label="Почтовый код" name="zipcode">
      <UInput class="w-full" v-model="state.zipcode as string" type="text" />
    </UFormField>

    <UFormField label="О себе как о гм-е" name="about">
      <UTextarea class="w-full" v-model="state.about as string" />
    </UFormField>

    <UFormField label="Как вы проводите игры" name="about">
      <UTextarea class="w-full" v-model="state.gameStyle as string" />
    </UFormField>

    <SocLinksInput v-model="state.social_links" />

    <Button color="secondary" class="mx-auto block" type="submit"> Сохранить изменения </Button>
  </UForm>
</template>
