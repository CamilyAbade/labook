import express from "express";
import { PostsController } from "../controller/posts/PostsController";

export const postsRouter = express.Router();

const postsController = new PostsController();
postsRouter.post("/create", postsController.createPost);
postsRouter.get("/:id", postsController.searchPostbyId);
