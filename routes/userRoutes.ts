import express from 'express';

import { verifyUser, createUser, logOut } from '../controllers/authControllers';
const userRouter = express.Router();

userRouter.post('/login', verifyUser);

userRouter.post('/signup', createUser);

userRouter.post('/logout', logOut);


export default userRouter;