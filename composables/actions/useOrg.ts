import {API_ENDPOINTS, type TApiPayloads} from '#consts/api-endpoints';

export type TOrgCreateReq = TApiPayloads['ORG']['CREATE']['POST']['req'];
export type TOrgCreateRes = TApiPayloads['ORG']['CREATE']['POST']['res'];

export type TOrgIndexRes = TApiPayloads['ORG']['INDEX']['GET']['res'];
export type TOrgMeRes = TApiPayloads['ORG']['ME']['GET']['res'];
export type TOrgMePatchReq = TApiPayloads['ORG']['ME']['PATCH']['req'];
export type TOrgMeDeleteRes = TApiPayloads['ORG']['ME']['DELETE']['res'];
export type TOrgSlugRes = TApiPayloads['ORG']['SLUG']['GET']['res'];

const urlOrgCreate = API_ENDPOINTS.ORG.CREATE;
const urlOrgIndex = API_ENDPOINTS.ORG.INDEX;
const urlOrgMe = API_ENDPOINTS.ORG.ME;
const urlOrgSlug = API_ENDPOINTS.ORG.SLUG;

export default function useActions() {
  const error = ref<string | null>(null);

  const createOrgAction = async (body: TOrgCreateReq) => {
    error.value = null;

    try {
      await useApi<TOrgCreateRes>(urlOrgCreate, {
        method: 'POST',
        credentials: 'include',
        body,
      });
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка создания организатора';
      throw err;
    }
  };

  const getOrgsAction = async () => {
    error.value = null;

    try {
      const data = await useApi<TOrgIndexRes>(urlOrgIndex, {
        method: 'GET',
        silent: true,
        noControle: true,
      });
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения списка организаторов';
      throw err;
    }
  };

  const getMeAction = async () => {
    error.value = null;

    try {
      const data = await useApi<TOrgMeRes>(urlOrgMe, {method: 'GET', credentials: 'include'});
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения профиля организатора';
      throw err;
    }
  };

  const patchMeAction = async (body: TOrgMePatchReq) => {
    error.value = null;

    try {
      await useApi(urlOrgMe, {method: 'PATCH', credentials: 'include', body});
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка обновления профиля организатора';
      throw err;
    }
  };

  const deleteMeAction = async () => {
    error.value = null;

    try {
      const data = await useApi<TOrgMeDeleteRes>(urlOrgMe, {
        method: 'DELETE',
        credentials: 'include',
      });
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка удаления профиля организатора';
      throw err;
    }
  };

  const getBySlugAction = async (slug: string) => {
    error.value = null;

    try {
      const data = await useApi<TOrgSlugRes>(`${urlOrgSlug}${slug}`, {method: 'GET'});
      return data;
    } catch (err: any) {
      error.value = err.statusMessage || 'Ошибка получения организатора';
      throw err;
    }
  };

  return {
    createOrgAction,
    getOrgsAction,
    getMeAction,
    patchMeAction,
    deleteMeAction,
    getBySlugAction,
    error,
  };
}
