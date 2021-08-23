import { Request, Response } from "express";
import { errorMonitor } from "node:events";
import { PostBusiness } from "../../business/posts/PostsBusiness";
import { PostCreateDTO, PostSearchDTO } from "../../model/types";

export class PostsController {
  async createPost(req: Request, res: Response) {
    try {
      let message = "Success!";

      const { photo, description, type, createdAt }: any = req.body;
      const token: string = req.headers.authorization as string;

      const create: PostCreateDTO = {
        photo,
        description,
        createdAt,
        type,
        token,
      };

      const postBusiness = new PostBusiness();
      await postBusiness.create(create);

      res.status(201).send({ message });
    } catch (error) {
      res.statusCode = 400;
      let message = error.sqlMessage || error.message;

      res.send({ message });
    }
  }
  async searchPostbyId(req: Request, res: Response) {
    try {
      let message = "Success!";
      const { id } = req.params;
      const token: string = req.headers.authorization as string;
      const searchDTO: PostSearchDTO = {
        id,
        token,
      };
      const postBusiness = new PostBusiness();
      const post = await postBusiness.searchPostById(searchDTO);

      res.status(200).send({ message, post });
    } catch (error) {
      res.statusCode = 400;
      if (error.message === "Post not found") {
        res.statusCode = 404;
      }
      let message = error.sqlMessage || error.message;

      res.send({ message });
    }
  }
}
