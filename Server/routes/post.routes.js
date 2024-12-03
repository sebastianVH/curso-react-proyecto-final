import { Router } from "express";
import getAllPosts from "../controllers/PostControllers/getAllPosts.js";
import getOnePost from "../controllers/PostControllers/getOnePost.js";
import createPost from "../controllers/PostControllers/createPost.js";
import deletePost from "../controllers/PostControllers/deletePost.js";
import updatePost from "../controllers/PostControllers/updatePost.js";
import setLike from "../controllers/PostControllers/setLike.js";
import authenticate from "../middlewares/auth.js";

const postRouter = Router()

postRouter.get('/',getAllPosts)
postRouter.get('/:id',getOnePost)
postRouter.post('/',authenticate,createPost)
postRouter.delete('/:id', authenticate, deletePost)
postRouter.put('/like',authenticate,setLike)
postRouter.put('/:id',authenticate, updatePost)


export default postRouter