import {db} from "./utils/db";

export default defineEventHandler(async (event) => {
  try {
    // Просто обращаемся к db, она подхватится из utils
    const allUsers = await db.query.users.findMany();
    return allUsers;
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка базы данных',
    });
  }
});