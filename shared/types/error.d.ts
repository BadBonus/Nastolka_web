export { }

declare global {
  type TBackendError = {
    statusCode: number;
    message: string;
    error: string;
  };
}