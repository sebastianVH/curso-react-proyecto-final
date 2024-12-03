import { Router } from "express";
import createComment from "../controllers/CommentControllers/createComment.js";
import updateComment from "../controllers/CommentControllers/updateComment.js";
import deleteComment from "../controllers/CommentControllers/deleteComment.js";

const commentRouter = Router()

commentRouter.post('/',createComment)
commentRouter.put('/:id',updateComment)
commentRouter.delete('/:id',deleteComment)

export default commentRouter