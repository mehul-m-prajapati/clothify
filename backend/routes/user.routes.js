import {adminLogin, loginUser, registerUser} from '../controllers/user.controller.js'
import express from 'express'

const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.post('/admin', adminLogin);


export default userRouter;
