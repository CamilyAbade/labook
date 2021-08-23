import { PostDatabase } from "../../data/posts/Postsdatabase";
import { UserDatabase } from "../../data/users/UsersDatabase";
import { Post, PostCreateDTO, PostSearchDTO } from "../../model/types";
import { Authenticator } from "../../services/authenticator";
import { IdGenerator } from "../../services/idGenarator";

export class PostBusiness {
  async create({ photo, description, type, createdAt, token }: PostCreateDTO) {
    const authenticationData = new Authenticator();
    const tokenData = authenticationData.getTokenData(token);

    const idGenerator = new IdGenerator();
    const id: string = idGenerator.generateId();

    const post: Post = {
      photo,
      description,
      createdAt,
      type,
      authorId: tokenData.id,
      id,
    };

    const postDatabase = new PostDatabase();
    await postDatabase.create(post);
  }

  async searchPostById({ id, token }: PostSearchDTO): Promise<Post> {
    const authenticationData = new Authenticator();
    const tokenData = authenticationData.getTokenData(token);

    const userDatabase = new UserDatabase();
    const queryId = await userDatabase.findById(tokenData.id);
    if (!queryId[0]) {
      throw new Error("Invalid token");
    }

    const postDatabase = new PostDatabase();
    const queryResult = await postDatabase.findById(id);

    if (!queryResult[0]) {
      const message = "Post not found";
      throw new Error(message);
    }
    const post: Post = {
      id: queryResult[0].id,
      photo: queryResult[0].photo,
      description: queryResult[0].description,
      type: queryResult[0].type,
      createdAt: queryResult[0].created_at,
      authorId: queryResult[0].author_id,
    };
    return post;
  }
}
