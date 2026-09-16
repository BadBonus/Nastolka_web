export default (callback: Function, wait: number) => {
  let timeoutId = null as null | number;
  return (...args: any) => {
    clearTimeout(timeoutId as number);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}