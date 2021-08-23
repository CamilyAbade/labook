import { User } from "../../model/types";
import { BaseDatabase } from "../BaseDatabase";

export class UserDatabase extends BaseDatabase {
  async findById(id: string) {
    return BaseDatabase.connection("labook_users").select("*").where({ id });
  }
  async findByEmail(email: string) {
    return BaseDatabase.connection("labook_users").select("*").where({ email });
  }
  async signup(user: User) {
    await BaseDatabase.connection("labook_users").insert({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
