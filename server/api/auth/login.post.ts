import argon2 from 'argon2';
import {eq, and} from 'drizzle-orm';
import {db} from '~/server/database/client';
import {users, accounts, sessions} from '~/server/database/schema';
import {loginUserSchema} from "@/shared/validationSchemas/login";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = loginUserSchema.safeParse(body);

  // 1. Базовая валидация входных данных
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.errors[0].message,
    });
  }

  const {email, password} = result.data;

  try {
    // 2. Ищем аккаунт по email и провайдеру
    // Используем join, чтобы сразу получить данные пользователя
    const result = await db
      .select({
        userId: users.id,
        nickname: users.nickname,
        email: users.email,
        passwordHash: accounts.passwordHash,
      })
      .from(accounts)
      .innerJoin(users, eq(accounts.userId, users.id))
      .where(
        and(
          eq(accounts.provider, 'email'),
          eq(accounts.providerAccountId, email)
        )
      )
      .limit(1);

    const userAccount = result[0];

    // 3. Проверяем, существует ли аккаунт и есть ли у него пароль
    if (!userAccount || !userAccount.passwordHash) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль',
      });
    }

    // 4. Сравниваем введенный пароль с хешем из базы
    const isPasswordValid = await argon2.verify(userAccount.passwordHash, password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль',
      });
    }

    // 5. Генерируем новые токены (используем наши хелперы из utils)
    const accessToken = await generateAccessToken(userAccount.userId);
    const refreshToken = await generateRefreshToken(userAccount.userId);

    // 6. Сохраняем сессию в БД (Token Rotation)
    // В идеале: сначала удалить старые сессии этого юзера, но пока просто добавим новую
    await db.insert(sessions).values({
      userId: userAccount.userId,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
    });

    // 7. Устанавливаем Refresh Token в HttpOnly куку
    setCookie(event, 'refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });

    // 8. Возвращаем данные пользователя и Access Token
    return {
      user: {
        id: userAccount.userId,
        nickname: userAccount.nickname,
        email: userAccount.email,
      },
      accessToken
    };

  } catch (error: any) {
    // Если это уже ошибка H3 (createError), пробрасываем её
    if (error.statusCode) throw error;

    // Иначе логируем и отдаем 500
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Внутренняя ошибка сервера',
    });
  }
});