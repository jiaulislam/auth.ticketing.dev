import express from 'express';
import {json} from 'body-parser';
import cookieSession from "cookie-session";
import 'express-async-errors';
import {errorHandlerMiddleware} from "@jiaulislam.dev/common.ticketing.dev";


// routes
import {authRouter, userRouter} from './routes';


const app = express();
app.use(json());
app.set('trust proxy', true);
app.use(cookieSession({name: 'session', signed: false, secure: process.env.NODE_ENV === 'production'}));


app.use('/api/v1/auth', userRouter);
app.use('/api/v1/auth', authRouter); // this must be after userRouter to avoid conflicts
// @ts-ignore
app.use(errorHandlerMiddleware);

export {app};