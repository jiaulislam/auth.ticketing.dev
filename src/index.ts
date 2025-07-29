import express from 'express';
import { json } from 'body-parser';

// Importing routes
import { authRouter, userRouter } from './routes';
// Importing middlewares
import { errorhandler } from './middlewares';

const app = express();

app.use(json());
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/auth', authRouter); // this must be after userRouter to avoid conflicts

// Error handling middleware
app.use(errorhandler);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Auth Server is running on port ${process.env.SERVER_PORT || 3000}`);
});
