import useDictionariesFlow from '@/composables/use-cases/useDictionariesFlow';

const IDLE_TIMEOUT_MS = 3000;

const runWhenIdle = (task: () => void) => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => task(), {timeout: IDLE_TIMEOUT_MS});
    return;
  }

  setTimeout(task, 1);
};

export default defineNuxtPlugin(() => {
  const {loadDictionaries} = useDictionariesFlow();

  onNuxtReady(() => {
    runWhenIdle(() => {
      void loadDictionaries();
    });
  });
});
