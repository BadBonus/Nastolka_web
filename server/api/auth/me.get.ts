import {eq} from 'drizzle-orm';
import {db} from '~/server/database/client';
import {users} from '~/server/database/schema';
import {verifyToken} from '~/server/utils/jwt'; // Твоя функция проверки JWT

export default defineEventHandler(async (event) => {
  // 1. Получаем заголовок (билет)
  const authHeader = getRequestHeader(event, 'authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: 'Требуется авторизация',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Расшифровываем токен и получаем userId
    const decoded = await verifyToken(token);

    if (!decoded || !decoded.userId) {
      throw new Error();
    }

    // 3. Запрашиваем данные из БД (те же поля, что и в login.post)
    const result = await db
      .select({
        id: users.id,
        nickname: users.nickname,
        email: users.email,
        // Здесь можно добавить поля, которых нет в токене, но нужны в UI (аватар и т.д.)
      })
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    const user = result[0];

    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Пользователь не найден',
      });
    }

    // 4. Возвращаем объект пользователя (без токена, он у фронта уже есть)
    return user;

  } catch (error) {
    // Если JWT невалиден или протух
    throw createError({
      statusCode: 401,
      message: 'Сессия истекла или неверна',
    });
  }
});