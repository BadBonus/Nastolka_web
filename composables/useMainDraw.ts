const open = ref<boolean>(false);
const toggleDrawState = (state?: boolean) => {
  if (typeof state === 'undefined') open.value = !open.value;
  else open.value = state;
}

export default function useMainModal(): {
  open: Ref<boolean, boolean>,
  toggleDrawState: (state?: boolean) => void
} {
  return {
    open,
    toggleDrawState
  }
}

