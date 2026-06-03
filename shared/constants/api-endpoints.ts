import type { paths } from '../types/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    RESET_PASSWORD_REQUEST: '/auth/reset-password/request',
    RESET_PASSWORD_VALIDATE: '/auth/reset-password/validate',
    RESET_PASSWORD_CONFIRM: '/auth/reset-password/confirm',
  },
  PROFILE: {
    ID: '/profile/',
    INDEX: '/profile',
  },
} as const;

export type TApiPayloads = {
  AUTH: {
    LOGIN: {
      POST: {
        req: paths['/auth/login']['post']['requestBody']['content']['application/json'];
        res: paths['/auth/login']['post']['responses']['201']['content']['application/json'];
      };
    };
    REGISTER: {
      POST: {
        req: paths['/auth/register']['post']['requestBody']['content']['application/json'];
        res?: void;
      };
    };
    VERIFY_EMAIL: {
      POST: {
        req: paths['/auth/verify-email']['post']['requestBody']['content']['application/json'];
        res?: void;
      };
    };
    ME: {
      GET: {
        req?: never;
        res: paths['/auth/me']['get']['responses']['200']['content']['application/json'];
      };
      DELETE: {
        req?: never;
        res: paths['/auth/me']['delete']['responses']['200']['content']['application/json'];
      };
    };
    LOGOUT: {
      POST: {
        req?: never;
        res?: void;
      };
    };
    REFRESH: {
      POST: {
        req?: never;
        res: paths['/auth/refresh']['post']['responses']['200']['content']['application/json'];
      };
    };
    RESET_PASSWORD_REQUEST: {
      POST: {
        req: paths['/auth/reset-password/request']['post']['requestBody']['content']['application/json'];
        res?: void;
      };
    };
    RESET_PASSWORD_VALIDATE: {
      GET: {
        req?: never;
        res?: void;
      };
    };
    RESET_PASSWORD_CONFIRM: {
      POST: {
        req: paths['/auth/reset-password/confirm']['post']['requestBody']['content']['application/json'];
        res?: void;
      };
    };
  };
  PROFILE: {
    ID: {
      GET: {
        req?: never;
        res?: void;
      };
      PATCH: {
        req: paths['/profile/{id}']['patch']['requestBody']['content']['application/json'];
        res?: void;
      };
    };
    INDEX: {
      GET: {
        req?: never;
        res: paths['/profile']['get']['responses']['200']['content']['application/json'];
      };
    };
  };
};

export type ApiPath = keyof paths;
