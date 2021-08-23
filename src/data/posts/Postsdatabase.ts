import { Post } from "../../model/types";
import { BaseDatabase } from "../BaseDatabase";

export class PostDatabase extends BaseDatabase {
  async create({ photo, description, createdAt, type, authorId, id }: Post) {
    await BaseDatabase.connection("labook_posts").insert({
      id,
      photo,
      description,
      type,
      created_at: createdAt,
      author_id: authorId,
    });
  }
  async findById(id: string) {
    return BaseDatabase.connection("labook_posts").select("*").where({ id });
  }
}
