import express, { Request, Response } from 'express';
import status from 'http-status-codes';

import { body, FieldValidationError, validationResult } from 'express-validator';
import { RequestValidationError, AlreadyExists, NotAuthenticatedError } from '../errors';
import { UserService } from '../service/user';
import { PasswordService } from '../service/password';
import { generateToken } from '../service/jwt';

const router = express.Router();

const userService = new UserService();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(
        errors.array().filter((err): err is FieldValidationError => err.type === 'field'),
      );
    }
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new NotAuthenticatedError();
    }

    if (!(await PasswordService.compare(user.password, password))) {
      throw new NotAuthenticatedError();
    }
    req.session = {
      jwt: generateToken(user.id, user.email),
    };
    res.status(status.OK).json({
      message: 'Login successful',
      user: userService.serializeUser(user),
    });
  },
);

router.post('/logout', (req, res) => {
  // Here you would typically clear the session or token
  res.send('Logout successful');
});

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('Confirm Password is required'),
  ],
  async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new RequestValidationError([
        { type: 'field', location: 'body', msg: 'Passwords do not match', path: 'confirmPassword' },
      ]);
    }
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      throw new AlreadyExists('User with this email already exists');
    }
    const user = {
      email,
      password: await PasswordService.toHash(password),
    };
    const createdUser = await userService.createUser(user);

    res.status(status.CREATED).json(userService.serializeUser(createdUser));
  },
);

export { router as authRouter };
