import { Prisma, PrismaClient, User } from '@prisma/client'
import { BaseModelService } from '@jiaul.islam/common.ticketing.dev';
import { DefaultArgs } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();


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

export class UserService extends BaseModelService<
  Prisma.UserDelegate<DefaultArgs>,
  User,
  Prisma.UserFindUniqueArgs<DefaultArgs>,
  Prisma.UserFindManyArgs<DefaultArgs>,
  Prisma.UserCreateArgs<DefaultArgs>,
  Prisma.UserUpdateArgs<DefaultArgs>,
  Prisma.UserDeleteArgs<DefaultArgs>,
  Prisma.UserCountArgs<DefaultArgs>,
  Prisma.UserUpsertArgs<DefaultArgs>
> {

  protected getModel(): Prisma.UserDelegate<DefaultArgs, {}> {
    return prisma.user;
  }

  public serializeUser(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
