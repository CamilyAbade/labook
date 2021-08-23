import { Request, Response } from "express";
import { UserBusiness } from "../../business/users/UsersBusiness";
import { User, UserLoginDTO, UserSignupDTO } from "../../model/types";

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      let message = "Success!";
      const { name, email, password } = req.body;
      
      const user: UserSignupDTO = {
        name,
        email,
        password,
      };
      const userBusiness = new UserBusiness();
      const token = await userBusiness.signup(user);

      res.status(201).send({ message, token });
    } catch (error) {
      res.statusCode = 400;
      if (error.message === '"name", "email" and "password" must be provided') {
        res.statusCode = 406;
      }
      let message = error.sqlMessage || error.message;

      res.send({ message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      let message = "Success!";

      const { email, password } = req.body;
      const userLogin: UserLoginDTO = {
        email,
        password,
      };
      const userBusiness = new UserBusiness();
      const token = await userBusiness.login(userLogin);

      res.status(200).send({ message, token });
    } catch (error) {
      res.statusCode = 400;
      if (error.message === "Invalid credentials") {
        res.statusCode = 401;
      }
      let message = error.sqlMessage || error.message;

      res.send({ message });
    }
  }
}
