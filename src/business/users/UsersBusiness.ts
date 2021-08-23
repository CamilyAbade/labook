import { Request, Response } from "express";
import { UserDatabase } from "../../data/users/UsersDatabase";
import { User, UserLoginDTO, UserSignupDTO } from "../../model/types";
import { Authenticator } from "../../services/authenticator";
import { HashManager } from "../../services/hashManager";
import { IdGenerator } from "../../services/idGenarator";

export class UserBusiness {
  async signup({ name, email, password }: UserSignupDTO): Promise<string> {
    if (!name || !email || !password) {
      const message = '"name", "email" and "password" must be provided';
      throw new Error(message);
    }
    const idGenerator = new IdGenerator();
    const id: string = idGenerator.generateId();

    const hashManager = new HashManager();
    const cypherPassword = await hashManager.hash(password);

    const newUser: User = { id, name, email, password: cypherPassword };
    const userDatabase = new UserDatabase();
    await userDatabase.signup(newUser);

    const authenticator = new Authenticator();
    const token: string = authenticator.generateToken({ id });

    return token;
  }

  async login({ email, password }: UserLoginDTO): Promise<string> {
    if (!email || !password) {
      const message = '"email" and "password" must be provided';
      throw new Error(message);
    }
    const userDatabase = new UserDatabase();
    const queryResult = await userDatabase.findByEmail(email);

    if (!queryResult[0]) {
      const message = "Invalid credentials";
      throw new Error(message);
    }

    const user: User = {
      id: queryResult[0].id,
      name: queryResult[0].name,
      email: queryResult[0].email,
      password: queryResult[0].password,
    };

    const hashManager = new HashManager();
    const passwordIsCorrect: boolean = await hashManager.compare(
      password,
      user.password
    );

    if (!passwordIsCorrect) {
      const message = "Invalid credentials";
      throw new Error(message);
    }

    const authenticator = new Authenticator();
    const token: string = authenticator.generateToken({
      id: user.id,
    });

    return token;
  }
}
