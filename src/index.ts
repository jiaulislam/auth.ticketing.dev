import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

// Importing routes
import { authRouter, userRouter } from './routes';
// Importing middlewares
import { errorhandler } from './middlewares';
import { NotFoundError } from './errors';

const app = express();

app.use(json());
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/auth', authRouter); // this must be after userRouter to avoid conflicts
app.use(
  cookieSession({ name: 'session', signed: false, secure: process.env.NODE_ENV === 'production' }),
);

app.all('*', (_req, _res) => {
  throw new NotFoundError();
});
// Error handling middleware
app.use(errorhandler);

app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Auth Server is running on port ${process.env.SERVER_PORT || 4000}`);
});
