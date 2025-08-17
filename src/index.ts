import { app } from "./app";

import { PrismaClient } from "@prisma/client";
import { UserService } from "./service/user.service";

const prisma = new PrismaClient();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }
  // create a system User here
  const userService = new UserService();
  const adminExists = await userService.findUnique({
    where: {
      email: 'admin@ticketing.dev',
    },
  });
  if (!adminExists) {
    await userService.create({
      data: {
        email: 'admin@ticketing.dev',
        password: 'password',
      }
    });
  }
  app.listen(process.env.SERVER_PORT || 4000, () => {
    console.log(`Auth Server is running on port ${process.env.SERVER_PORT || 4000}`);
  });
}

start(); // eslint-disable-line



