import {db} from '@/server/database/client';
import {users} from '@/server/database/schema';

export default defineEventHandler(async (event) => {
  const newUser = await db.insert(users).values({
    fullName: 'Fullstack Developer',
    email: 'test@example.com',
  }).returning();

  return newUser;
});