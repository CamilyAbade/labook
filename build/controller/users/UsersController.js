"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UsersBusiness_1 = require("../../business/users/UsersBusiness");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const { name, email, password } = req.body;
                const user = {
                    name,
                    email,
                    password,
                };
                const userBusiness = new UsersBusiness_1.UserBusiness();
                const token = yield userBusiness.signup(user);
                res.status(201).send({ message, token });
            }
            catch (error) {
                res.statusCode = 400;
                if (error.message === '"name", "email" and "password" must be provided') {
                    res.statusCode = 406;
                }
                let message = error.sqlMessage || error.message;
                res.send({ message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const { email, password } = req.body;
                const userLogin = {
                    email,
                    password,
                };
                const userBusiness = new UsersBusiness_1.UserBusiness();
                const token = yield userBusiness.login(userLogin);
                res.status(200).send({ message, token });
            }
            catch (error) {
                res.statusCode = 400;
                if (error.message === "Invalid credentials") {
                    res.statusCode = 401;
                }
                let message = error.sqlMessage || error.message;
                res.send({ message });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UsersController.js.map