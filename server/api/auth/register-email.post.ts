import argon2 from 'argon2';
import {db} from '~/server/database/client';
import {users, accounts, sessions} from '~/server/database/schema';
import {registerUserSchema} from '@/shared/validationSchemas/user';
import {generateUniqueSlug} from "./utils";

const TOKEN_LIFE = 7 * 24 * 60 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = registerUserSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.errors[0].message,
    });
  }

  const {email, password, nickname} = result.data;
  const slug = generateUniqueSlug(nickname);

  try {
    return await db.transaction(async (tx) => {
      const passwordHash = await argon2.hash(password);

      const [newUser] = await tx.insert(users).values({nickname, email, slug}).returning();

      // 3. Создаем аккаунт
      await tx.insert(accounts).values({
        userId: newUser.id,
        provider: 'email',
        providerAccountId: email,
        passwordHash: passwordHash,
      });

      // 4. Генерируем токены (наши хелперы из utils)
      const accessToken = await generateAccessToken(newUser.id);
      const refreshToken = await generateRefreshToken(newUser.id);

      // 5. Сохраняем сессию в базу (для refresh логики)
      await tx.insert(sessions).values({
        userId: newUser.id,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + TOKEN_LIFE),
      });

      // 6. Устанавливаем Refresh Token в защищенную куку (HttpOnly)
      setCookie(event, 'refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60
      });

      // Возвращаем профиль и Access Token
      return {
        user: {
          id: newUser.id,
          nickname: newUser.nickname,
          email: newUser.email
        },
        accessToken
      };
    });
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ошибка регистрации: возможно, email уже используется.',
    });
  }
});