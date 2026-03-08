

import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signUp',(req,res)=>{
    userController.postSignUp(req,res)
});

userRouter.post('/signIn',(req,res)=>{
    userController.postSignIn(req,res)
});

userRouter.get('/',(req,res)=>{
    userController.usersAll(req,res);
})

export default userRouter;