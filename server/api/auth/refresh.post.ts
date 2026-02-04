import {db} from '~/server/database/client';
import {sessions, users} from '~/server/database/schema';
import {eq, and, gt} from 'drizzle-orm';
import {generateAccessToken, generateRefreshToken} from '@/server/utils/jwt';
import {AUTH_COOKIE_TOKEN_NAME, AUTH_COOKIE_OPTIONS, TOKEN_LIFE} from '~/shared/utils/auth.constants';


export default defineEventHandler(async (event) => {
  const oldRefreshToken = getCookie(event, AUTH_COOKIE_TOKEN_NAME);

  if (!oldRefreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Refresh token missing',
    });
  }

  try {
    // 2. Ищем сессию в БД + проверяем срок годности (expiresAt > сейчас)
    const [session] = await db
      .select({
        id: sessions.id,
        userId: sessions.userId,
        expiresAt: sessions.expiresAt,
        user: {
          id: users.id,
          email: users.email,
          nickname: users.nickname,
        },
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(
        and(
          eq(sessions.refreshToken, oldRefreshToken),
          gt(sessions.expiresAt, new Date()) // Токен не должен быть протухшим в БД
        )
      )
      .limit(1);

    if (!session) {
      // Если токен не найден или протух — чистим куку и выкидываем
      deleteCookie(event, AUTH_COOKIE_TOKEN_NAME);
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired session',
      });
    }

    // 3. Генерируем новую пару токенов
    const accessToken = await generateAccessToken(session.userId);
    const newRefreshToken = await generateRefreshToken(session.userId);

    // 4. Обновляем сессию в БД (Rotation)
    // Мы перезаписываем текущую сессию новым токеном и продлеваем ей жизнь

    await db
      .update(sessions)
      .set({
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + TOKEN_LIFE),
      })
      .where(eq(sessions.id, session.id));

    // 5. Устанавливаем НОВУЮ куку
    setCookie(event, 'refresh_token', newRefreshToken, AUTH_COOKIE_OPTIONS);

    // 6. Возвращаем новый Access Token и данные юзера
    return {
      accessToken,
      user: session.user
    };

  } catch (error: any) {
    // В любой непонятной ситуации — логаут
    deleteCookie(event, AUTH_COOKIE_TOKEN_NAME);
    throw createError({
      statusCode: 401,
      statusMessage: 'Session refresh failed',
    });
  }
});