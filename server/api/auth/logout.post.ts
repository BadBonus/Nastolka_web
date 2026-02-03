import {db} from '~/server/database/client';
import {sessions} from '~/server/database/schema';
import {eq} from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');

  if (refreshToken) {
    try {
      await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
    } catch (error) {
      console.error('Logout DB error:', error);
    }
  }

  // 3. Стираем HttpOnly куку на стороне клиента
  // Важно передать те же параметры (path, domain), если они задавались при установке
  deleteCookie(event, 'refresh_token', {
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