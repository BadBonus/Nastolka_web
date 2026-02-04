export interface IApiRepository {
  fetch<T>(url: string, options: any): Promise<T>;
}