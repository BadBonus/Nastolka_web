import argon2 from 'argon2';
import { db } from '../database/client';
import { users, accounts, sessions } from '../database/schema';

export const AuthService = {
  // 1. Генерация пары токенов
  generateTokens(userId: number) {
    // В реальности используй секрет из .env
    const accessToken = "генерация_jwt_на_15_минут"; 
    const refreshToken = "генерация_длинной_строки_на_7_дней";
    return { accessToken, refreshToken };
  },

  // 2. Атомарная регистрация
  async register(data: { email: string, password: string, fullName: string, nickname: string, slug: string }) {
    return await db.transaction(async (tx) => {
      // Хешируем пароль
      const passwordHash = await argon2.hash(data.password);

      // Создаем профиль пользователя
      const [newUser] = await tx.insert(users).values({
        fullName: data.fullName,
        nickname: data.nickname,
        email: data.email,
        slug: data.slug,
      }).returning();

      // Создаем запись в таблице аккаунтов
      await tx.insert(accounts).values({
        userId: newUser.id,
        provider: 'email',
        providerAccountId: data.email,
        passwordHash: passwordHash,
      });

      // Генерируем токены
      const { accessToken, refreshToken } = this.generateTokens(newUser.id);

      // Сохраняем Refresh Token в базу
      await tx.insert(sessions).values({
        userId: newUser.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 дней
      });

      return { user: newUser, accessToken, refreshToken };
    });
  }
};