import {users} from '../database/schema';

export default defineEventHandler(async (event) => {
  const newUser = await db.insert(users).values({
    fullName: 'Fullstack Developer',
    email: 'test@example.com',
  }).returning();

  return newUser;
});