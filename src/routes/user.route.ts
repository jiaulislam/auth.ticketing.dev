import express from 'express';

const router = express.Router();

// users routes
router.get('/', (req, res) => {
  res.send('User route is working');
});

router.post('/', (req, res) => {
  res.send('User created successfully');
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId} updated successfully`);
});

router.get('/profile', (req, res) => {
  // Here you would typically fetch the user profile from the database
  res.send('User profile fetched successfully');
});

export { router as userRouter };
