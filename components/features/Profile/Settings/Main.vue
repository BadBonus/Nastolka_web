<script setup lang="ts">
import DetailsForm from './DetailsForm.vue';
import type { TSettingsProps } from './DetailsForm.vue';
import type { TPatchProfilePayload } from '~/shared/types/profile';
import type { TImageCropper, TModifiedCropperResult } from '~/components/globals/ImageCropper.vue';

export type TSettingsMainProps = TSettingsProps & { avatar?: string };

// NOTE: Такой размер поступил от бэкенда
const PROFILE_IMG_PROPERTIES: TImageCropper = {
  minWidth: 256,
  minHeight: 256,
  maxWidth: 256,
  maxHeight: 256,
};

defineOptions({
  name: 'SettingsMain',
});

const props = defineProps<TSettingsMainProps>();
const createInitialState = (data?: Partial<TSettingsMainProps>): TSettingsMainProps => ({
  nickname: data?.nickname ?? '',
  timezone: data?.timezone ?? 'UTC',
  email: data?.email ?? '',
  fio: data?.fio,
  about: data?.about,
  social_links: data?.social_links,
  availableDays: data?.availableDays,
  birthdate: data?.birthdate,
  avatar: data?.avatar,
});

const fileOfnewAvatar = ref<null | TModifiedCropperResult>(null);

const currentAvatarSrc = computed(() => {
  if (fileOfnewAvatar.value?.canvas) {
    return fileOfnewAvatar.value.canvas.toDataURL('image/png');
  }
  return stateDetailsForm.value.avatar;
});

const stateDetailsForm = ref<TSettingsMainProps>(createInitialState(props));
const emit = defineEmits<{
  (event: 'updateSettings', data: TPatchProfilePayload, avatar?: HTMLCanvasElement): Promise<void>;
}>();

const onSubmit = async (data: TSettingsMainProps) => {
  await emit('updateSettings', data, fileOfnewAvatar.value?.canvas);
};

const changeAvatar = (data: TModifiedCropperResult) => {
  fileOfnewAvatar.value = data;
};

watch(
  () => props,
  (newProps) => {
    stateDetailsForm.value = createInitialState(newProps);
  },
  { deep: true }
);
</script>
<template>
  <div class="SettingsMain">
    <div class="text-center">
      <h2 class="mb-2 text-xl font-bold">Изменить аватар</h2>
      <modals-change-img @confirm="changeAvatar" :cropper-props="PROFILE_IMG_PROPERTIES" title="Смена аватара">
        <button class="canEditWrapper shadow-element border-border relative rounded-full border-2">
          <NuxtImg
            class="bg-brown h-36 w-full min-w-36 rounded-full object-cover"
            :src="currentAvatarSrc"
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
