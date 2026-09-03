import type { paths } from '../types/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    RESET_PASSWORD_REQUEST: "/auth/reset-password/request",
    RESET_PASSWORD_VALIDATE: "/auth/reset-password/validate",
    RESET_PASSWORD_CONFIRM: "/auth/reset-password/confirm",
  },
  PROFILE: {
    ME: "/profile/me",
    ID: "/profile/",
  },
  ORG: {
    CREATE: "/org/create",
    INDEX: "/org",
    ME: "/org/me",
    SLUG: "/org/",
  },
  EVENTS: {
    INDEX: "/events",
    SLUG: "/events/",
    ID: "/events/",
    ID_CANCEL: "/events/{id}/cancel",
  },
  DICTIONARIES: {
    INDEX: "/dictionaries",
  },
} as const;

export type TApiPayloads = {
  AUTH: {
    LOGIN: {
      POST: {
        req: paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
        res: paths["/auth/login"]["post"]["responses"]["201"]["content"]["application/json"];
      };
    };
    REGISTER: {
      POST: {
        req: paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];
        res?: void;
      };
    };
    VERIFY_EMAIL: {
      POST: {
        req: paths["/auth/verify-email"]["post"]["requestBody"]["content"]["application/json"];
        res?: void;
      };
    };
    ME: {
      GET: {
        req?: never;
        res: paths["/auth/me"]["get"]["responses"]["200"]["content"]["application/json"];
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
        res: paths["/auth/refresh"]["post"]["responses"]["200"]["content"]["application/json"];
      };
    };
    RESET_PASSWORD_REQUEST: {
      POST: {
        req: paths["/auth/reset-password/request"]["post"]["requestBody"]["content"]["application/json"];
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
        req: paths["/auth/reset-password/confirm"]["post"]["requestBody"]["content"]["application/json"];
        res?: void;
      };
    };
  };
  PROFILE: {
    ME: {
      GET: {
        req?: never;
        res: paths["/profile/me"]["get"]["responses"]["200"]["content"]["application/json"];
      };
      PATCH: {
        req: paths["/profile/me"]["patch"]["requestBody"]["content"]["multipart/form-data"];
        res?: void;
      };
      DELETE: {
        req?: never;
        res?: void;
      };
    };
    ID: {
      GET: {
        req?: never;
        res: paths["/profile/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
      };
      PATCH: {
        req: paths["/profile/{id}"]["patch"]["requestBody"]["content"]["multipart/form-data"];
        res?: void;
      };
      DELETE: {
        req?: never;
        res?: void;
      };
    };
  };
  ORG: {
    CREATE: {
      POST: {
        req: paths["/org/create"]["post"]["requestBody"]["content"]["multipart/form-data"];
        res?: void;
      };
    };
    INDEX: {
      GET: {
        req?: never;
        res?: void;
      };
    };
    ME: {
      GET: {
        req?: never;
        res: paths["/org/me"]["get"]["responses"]["200"]["content"]["application/json"];
      };
      PATCH: {
        req: paths["/org/me"]["patch"]["requestBody"]["content"]["multipart/form-data"];
        res?: void;
      };
      DELETE: {
        req?: never;
        res: paths["/org/me"]["delete"]["responses"]["200"]["content"]["application/json"];
      };
    };
    SLUG: {
      GET: {
        req?: never;
        res?: void;
      };
    };
  };
  EVENTS: {
    INDEX: {
      POST: {
        req: paths["/events"]["post"]["requestBody"]["content"]["multipart/form-data"];
        res: paths["/events"]["post"]["responses"]["201"]["content"]["application/json"];
      };
      GET: {
        req?: never;
        res: paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];
      };
    };
    SLUG: {
      GET: {
        req?: never;
        res: paths["/events/{slug}"]["get"]["responses"]["200"]["content"]["application/json"];
      };
    };
    ID: {
      PATCH: {
        req: paths["/events/{id}"]["patch"]["requestBody"]["content"]["application/json"];
        res: paths["/events/{id}"]["patch"]["responses"]["200"]["content"]["application/json"];
      };
      DELETE: {
        req?: never;
        res?: void;
      };
    };
    ID_CANCEL: {
      PATCH: {
        req: paths["/events/{id}/cancel"]["patch"]["requestBody"]["content"]["application/json"];
        res: paths["/events/{id}/cancel"]["patch"]["responses"]["200"]["content"]["application/json"];
      };
    };
  };
  DICTIONARIES: {
    INDEX: {
      GET: {
        req?: never;
        res: paths["/dictionaries"]["get"]["responses"]["200"]["content"]["application/json"];
      };
    };
  };
};

export type ApiPath = keyof paths;