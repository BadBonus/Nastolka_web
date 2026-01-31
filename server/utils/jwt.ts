import {SignJWT, jwtVerify} from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateAccessToken = async (userId: number) => {
  return await new SignJWT({userId})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('15m') // Access token живет 15 минут
    .sign(SECRET);
};

export const generateRefreshToken = async (userId: number) => {
  return await new SignJWT({userId})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d') // Refresh token живет 7 дней
    .sign(SECRET);
};

export const verifyToken = async (token: string) => {
  try {
    const {payload} = await jwtVerify(token, SECRET);
    return payload as {userId: number};
  } catch (err) {
    return null; // Токен невалиден или просрочен
  }
};