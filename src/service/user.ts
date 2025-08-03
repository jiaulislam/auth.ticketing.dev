import {PrismaClient} from '../../generated/prisma';
import {User} from "../../generated/prisma/client";

const prisma = new PrismaClient();

interface CreateUserDTO {
    email: string;
    password: string;
}

interface UserDTO {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserService {
    async getUserByEmail(email: string): Promise<User | null>{
        return prisma.user.findUnique({
            where: {email: email},
        });
    }

    async createUser(user: CreateUserDTO): Promise<User> {
        return prisma.user.create({
            data: user,
        });
    }

    serializeUser(user: User): UserDTO {
        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}