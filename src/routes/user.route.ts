import express from 'express';
import { UserService } from '../service/user.service';
import { requireAuthMiddleware } from '@jiaulislam.dev/common.ticketing.dev';
const router = express.Router();

const userService = new UserService();

// users routes
router.get('/', async (_, res) => {
  const users = await userService.getUsers();
  const serializedUsers = users.map(userService.serializeUser);
  res.json(serializedUsers);
});

router.post('/', requireAuthMiddleware, async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(userService.serializeUser(newUser));
});

router.put('/:id', requireAuthMiddleware, async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await userService.updateUser(Number(userId), req.body);
  res.json(updatedUser);
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUserById(Number(userId));
  const serializedUser = userService.serializeUser(user!)
  res.json(serializedUser);
});

router.get('/profile', requireAuthMiddleware, async (req, res) => {
  const userId = req.currentUser!.id; // Assuming you have user ID in req.user
  const user = await userService.getUserById(Number(userId));
  res.json(user);
});

export { router as userRouter };
