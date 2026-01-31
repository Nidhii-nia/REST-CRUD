

import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signUp',userController.postSignUp);
userRouter.post('/signIn',userController.postSignIn);

export default userRouter;