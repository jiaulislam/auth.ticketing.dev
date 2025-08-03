

import {app} from "./app";


const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL must be defined');
    }
  app.listen(process.env.SERVER_PORT || 4000, () => {
    console.log(`Auth Server is running on port ${process.env.SERVER_PORT || 4000}`);
  });
}

start(); // eslint-disable-line



