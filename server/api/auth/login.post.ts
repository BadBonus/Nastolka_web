import argon2 from 'argon2';
import {eq, and} from 'drizzle-orm';
import {db} from '~/server/database/client';
import {users, accounts, sessions} from '~/server/database/schema';
import {loginUserSchema} from "~/shared/validationSchemas/login";
import type {TLoginPostFB} from "~/shared/types/serverFB/auth";
import {AUTH_COOKIE_TOKEN_NAME, AUTH_COOKIE_OPTIONS} from '~/shared/utils/auth.constants';


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = loginUserSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.errors[0].message,
    });
  }

  const {email, password} = result.data;

  try {
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

    if (!userAccount || !userAccount.passwordHash) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль',
      });
    }

    const isPasswordValid = await argon2.verify(userAccount.passwordHash, password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Неверный email или пароль',
      });
    }

    const accessToken = await generateAccessToken(userAccount.userId);
    const refreshToken = await generateRefreshToken(userAccount.userId);

    // Сохраняем сессию в БД (Token Rotation)
    // В идеале: сначала удалить старые сессии этого юзера, но пока просто добавим новую
    await db.insert(sessions).values({
      userId: userAccount.userId,
      refreshToken: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
    });

    setCookie(event, AUTH_COOKIE_TOKEN_NAME, refreshToken, AUTH_COOKIE_OPTIONS);

    return {
      user: {
        id: userAccount.userId,
        nickname: userAccount.nickname,
        email: userAccount.email,
      },
      accessToken
    } as TLoginPostFB;

  } catch (error: any) {
    if (error.statusCode) throw error;

    // Иначе логируем и отдаем 500
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Внутренняя ошибка сервера',
    });
  }
});