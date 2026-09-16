import {ORG} from '#openApi';

export type TOrgCreateReq = ORG['CREATE']['POST']['req'];
export type TOrgCreateRes = ORG['CREATE']['POST']['res'];

export type TOrgIndexQuery = ORG['INDEX']['GET']['query'];
export type TOrgIndexRes = ORG['INDEX']['GET']['res'];
export type TOrgMeRes = ORG['ME']['GET']['res'];
export type TOrgMePatchReq = ORG['ME']['PATCH']['req'];
export type TOrgMeDeleteRes = ORG['ME']['DELETE']['res'];
export type TOrgSlugRes = ORG['SLUG']['GET']['res'];

const urlOrgCreate = ORG.CREATE;
const urlOrgIndex = ORG.INDEX;
const urlOrgMe = ORG.ME;
const urlOrgSlug = ORG.SLUG;

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

  const getOrgsAction = async (query?: TOrgIndexQuery) => {
    error.value = null;

    try {
      const data = await useApi<TOrgIndexRes>(urlOrgIndex, {
        method: 'GET',
        silent: true,
        noControle: true,
        query,
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
