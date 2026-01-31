import slugify from 'slugify';
import {sql} from 'drizzle-orm';
import {db} from '~/server/database/client';
import {users} from '~/server/database/schema';

export const generateUniqueSlug = async (nickname: string): Promise<string> => {
  const baseSlug = slugify(nickname, {lower: true, strict: true});

  // 1. Ищем все слаги, которые начинаются на наш baseSlug
  const existingSlugs = await db
    .select({slug: users.slug})
    .from(users)
    .where(sql`${users.slug} ~ ${'^' + baseSlug + '(-\\d+)?$'}`);

  if (existingSlugs.length === 0) {
    return baseSlug;
  }

  const usedNumbers = existingSlugs.map(row => {
    const parts = row.slug.split('-');
    const lastPart = parts[parts.length - 1];
    return parseInt(lastPart) || 0;
  });

  const maxNumber = Math.max(...usedNumbers, 0);
  return `${baseSlug}-${maxNumber + 1}`;
};