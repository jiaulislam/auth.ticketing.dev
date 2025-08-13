import express from 'express';
import { UserService } from '../service/user.service';
import { requireAuthMiddleware } from '@jiaul.islam/common.ticketing.dev';
import { StatusCodes } from 'http-status-codes';


const router = express.Router();

const userService = new UserService();

// users routes
router.get('/', async (_, res) => {
  const users = await userService.findAll();
  const serializedUsers = users.map(userService.serializeUser);
  res.json(serializedUsers);
});

router.post('/', requireAuthMiddleware, async (req, res) => {
  const newUser = await userService.create(req.body);
  res.status(StatusCodes.CREATED).json(userService.serializeUser(newUser));
});

router.put('/:id', requireAuthMiddleware, async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await userService.update({ where: { id: Number(userId) }, data: req.body });
  res.json(updatedUser);
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await userService.findUnique({ where: { id: Number(userId) } });
  const serializedUser = userService.serializeUser(user!)
  res.json(serializedUser);
});

router.get('/profile', requireAuthMiddleware, async (req, res) => {
  const userId = req.currentUser!.id; // Assuming you have user ID in req.user
  const user = await userService.findUnique({ where: { id: Number(userId) } });
  res.json(user);
});

export { router as userRouter };
