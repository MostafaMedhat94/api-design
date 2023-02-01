import { Router } from 'express';
import { createUser, signin } from './user-handlers';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.post('/signin', signin);

export default userRouter;
