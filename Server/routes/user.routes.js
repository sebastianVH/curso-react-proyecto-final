import { Router } from "express";
import createUser from "../controllers/UserControllers/createUser.js";
import loginUser from "../controllers/UserControllers/loginUser.js";

const userRouter = Router()

userRouter.post('/',createUser) //creacion
userRouter.post('/login',loginUser) //login

export default userRouter
