import {db} from '~/server/database/client';
import {sessions} from '~/server/database/schema';
import {eq} from 'drizzle-orm';
import {AUTH_COOKIE_TOKEN_NAME} from '~/shared/utils/auth.constants';


export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, AUTH_COOKIE_TOKEN_NAME);

  if (refreshToken) {
    try {
      await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
    } catch (error) {
      console.error('Logout DB error:', error);
    }
  }

  // 3. Стираем HttpOnly куку на стороне клиента
  // Важно передать те же параметры (path, domain), если они задавались при установке
  deleteCookie(event, AUTH_COOKIE_TOKEN_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // 4. Возвращаем успешный статус
  return {
    success: true,
    message: 'Выход успешен'
  };
});