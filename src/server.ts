import express from 'express';
import morgan from 'morgan';

import router from './router';
import { protect } from './modules/auth';
import userRouter from './user/user-router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
  res.json({
    message: 'Good to see you'
  });
});

app.use('/api', protect, router);
app.use('/user', userRouter);

export default app;
