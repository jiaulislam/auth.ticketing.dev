import { Prisma, PrismaClient, User } from '@prisma/client'
import { BaseModelService } from '@jiaul.islam/common.ticketing.dev';
import { DefaultArgs } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

/**
 * Data Transfer Object for User entity.
 * Used to serialize user data for API responses or inter-service communication.
 */
interface UserDTO {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Service class for managing User entities using Prisma ORM.
 *
 * Extends the BaseModelService to provide type-safe CRUD operations, error handling,
 * and business logic for the User model. This service is enterprise-ready and can be
 * further extended for custom business requirements.
 *
 * @extends BaseModelService<Prisma.UserDelegate<DefaultArgs>, User, ...>
 */
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
  /**
   * Returns the Prisma delegate for the User model.
   *
   * @returns {Prisma.UserDelegate<DefaultArgs>} The Prisma delegate for User.
   */
  protected getModel(): Prisma.UserDelegate<DefaultArgs, {}> {
    return prisma.user;
  }

  /**
   * Serializes a User entity to a UserDTO.
   *
   * @param {User} user - The User entity to serialize.
   * @returns {UserDTO} The serialized user data.
   */
  public serializeUser(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
