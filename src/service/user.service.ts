import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface CreateUserDTO {
  email: string;
  password: string;
}

type UserModel = {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserDTO {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService {
  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }

  async getUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUsers() {
    return prisma.user.findMany();
  }

  async updateUser(userId: number, userData: Partial<UserModel>) {
    return prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  async createUser(user: CreateUserDTO) {
    return prisma.user.create({
      data: user,
    });
  }

  serializeUser(user: UserModel): UserDTO {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
