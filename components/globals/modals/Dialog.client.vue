<script setup lang="ts">
export type TModalsDialog = {
  title?: string;
  descr?: string;
  actionText?: string;
  dataForAction?: any;
};

defineOptions({
  name: "ModalsDialog",
});

withDefaults(defineProps<TModalsDialog>(), {
  actionText: "Да",
});

const emit = defineEmits<{
  action: (data: any) => void;
}>();
</script>
<template>
  <AlertDialogRoot>
    <AlertDialogTrigger>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="AlertDialogOverlay" />
      <AlertDialogContent class="AlertDialogContent">
        <AlertDialogTitle v-if="title" class="AlertDialogTitle">
          {{ title }}
        </AlertDialogTitle>
        <AlertDialogDescription v-if="descr" class="AlertDialogDescription">
          {{ descr }}
        </AlertDialogDescription>
        <slot name="inContent" />
        <div
          class="mt-3"
          :style="{ display: 'flex', gap: 25, justifyContent: 'flex-end' }"
        >
          <AlertDialogCancel>
            <Button color="secondary">Отмена</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            class="Button red"
            @click="() => emit('action', dataForAction)"
          >
            <Button color="primary"> {{ actionText }}</Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style>
.AlertDialogOverlay {
  background-color: var(--color-bg-secondary);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.AlertDialogContent {
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.AlertDialogContent:focus {
  outline: none;
}

.AlertDialogTitle {
  margin: 0;
  color: var(--mauve-12);
  font-size: 17px;
  font-weight: 500;
}

.AlertDialogDescription {
  margin-bottom: 20px;
  color: var(--mauve-11);
  font-size: 15px;
  line-height: 1.5;
}

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
}
.Button.green {
  background-color: white;
  color: var(--green-11);
  box-shadow: 0 2px 10px var(--black-a7);
}
.Button.green:hover {
  background-color: var(--mauve-3);
}
.Button.green:focus {
  box-shadow: 0 0 0 2px black;
}
.Button.red {
  background-color: var(--red-4);
  color: var(--red-11);
}
.Button.red:hover {
  background-color: var(--red-5);
}
.Button.red:focus {
  box-shadow: 0 0 0 2px var(--red-7);
}
.Button.mauve {
  background-color: var(--mauve-4);
  color: var(--mauve-11);
}
.Button.mauve:hover {
  background-color: var(--mauve-5);
}
.Button.mauve:focus {
  box-shadow: 0 0 0 2px var(--mauve-7);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
