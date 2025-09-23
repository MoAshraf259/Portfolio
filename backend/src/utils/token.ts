import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthTokenPayload {
  sub: string;
  email: string;
}

export const createAuthToken = (email: string) => {
  const options: SignOptions = {
    subject: email,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign({ email }, env.JWT_SECRET, options);
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload | string;
  if (typeof payload === 'string' || !payload) {
    throw new Error('Invalid token payload');
  }
  const subject = payload.sub ?? payload.email;
  if (!subject) {
    throw new Error('Invalid token payload');
  }
  return {
    sub: subject,
    email: (payload.email as string | undefined) ?? subject,
  };
};
