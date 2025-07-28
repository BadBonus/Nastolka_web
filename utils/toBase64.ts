/**
    * Асинхронно Преобразует картинки из input.type=file в base64.
    *
    * @param file - обычно берётся из input
    * @returns string | null (если ошибка)
    */

export default (file: File): Promise<string | null> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = () => reject(() => {
    console.error('toBase64(target.files[0]) --- error', reader.error);
    return null;
  });
});