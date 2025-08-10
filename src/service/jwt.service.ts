import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, email: string): string => {
  return jwt.sign({ id: userId, email }, process.env.JWT_KEY!);
};
