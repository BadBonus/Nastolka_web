<script setup lang="ts">
enum EMessageHost {
  you = "you",
  another = "another",
}

export type TChatWindowMessage = {
  messageType?: EMessageHost;
  user: {
    slug: string;
    avatar: string;
    name?: string;
    role?: string;
  };
  message: string;
  time: string;
};

defineOptions({
  name: "ChatWindowMessage",
});

const props = withDefaults(defineProps<TChatWindowMessage>(), {
  messageType: EMessageHost.another,
});

const styles = computed(() => {
  const anotherStyles = {
    avatar: "left-0",
    message: "bg-dark-brown/10 rounded-bl-[0]",
    contentWrapper: "ml-7 ",
  };

  const youStyles = {
    avatar: "right-0",
    message: "rounded-br-[0] bg-info text-white",
    contentWrapper: "mr-7 ml-auto",
  };

  return props.messageType === EMessageHost.another ? anotherStyles : youStyles;
});
</script>
<template>
  <div class="ChatWindowMessage relative">
    <div :class="styles.contentWrapper" class="w-[85%]">
      <div
        :class="{
          'justify-end': props.messageType === EMessageHost.you,
        }"
        class="ChatWindowMessage__header -truncate flex items-center gap-0.5 text-[0.6rem]"
      >
        <template v-if="props.messageType === EMessageHost.another">
          <b class="-truncate max-w-[190px]">
            {{ props.user.name }}
          </b>
          <span v-if="props.user.role"> &middot;</span>
          <i> {{ props.user.role }}</i>
          &middot;
        </template>
        <span> {{ props.time }} </span>
      </div>
      <div
        :class="styles.message"
        class="ChatWindowMessage__message w-fit rounded-lg p-1 text-xs break-all"
      >
        {{ props.message }}
      </div>
    </div>
    <NuxtLink :to="'/profile/' + props.user.slug">
      <u-avatar
        :class="styles.avatar"
        class="absolute bottom-0 size-6"
        :src="props.user.avatar"
      ></u-avatar>
    </NuxtLink>
  </div>
</template>

<!--<style lang="scss"></style>-->
