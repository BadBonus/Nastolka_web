export const isBackendError = (error: any): error is TBackendError => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
  );
};