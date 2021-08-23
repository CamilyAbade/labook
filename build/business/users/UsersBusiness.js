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
exports.UserBusiness = void 0;
const UsersDatabase_1 = require("../../data/users/UsersDatabase");
const authenticator_1 = require("../../services/authenticator");
const hashManager_1 = require("../../services/hashManager");
const idGenarator_1 = require("../../services/idGenarator");
class UserBusiness {
    signup({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password) {
                const message = '"name", "email" and "password" must be provided';
                throw new Error(message);
            }
            const idGenerator = new idGenarator_1.IdGenerator();
            const id = idGenerator.generateId();
            const hashManager = new hashManager_1.HashManager();
            const cypherPassword = yield hashManager.hash(password);
            const newUser = { id, name, email, password: cypherPassword };
            const userDatabase = new UsersDatabase_1.UserDatabase();
            yield userDatabase.signup(newUser);
            const authenticator = new authenticator_1.Authenticator();
            const token = authenticator.generateToken({ id });
            return token;
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                const message = '"email" and "password" must be provided';
                throw new Error(message);
            }
            const userDatabase = new UsersDatabase_1.UserDatabase();
            const queryResult = yield userDatabase.findByEmail(email);
            if (!queryResult[0]) {
                const message = "Invalid credentials";
                throw new Error(message);
            }
            const user = {
                id: queryResult[0].id,
                name: queryResult[0].name,
                email: queryResult[0].email,
                password: queryResult[0].password,
            };
            const hashManager = new hashManager_1.HashManager();
            const passwordIsCorrect = yield hashManager.compare(password, user.password);
            if (!passwordIsCorrect) {
                const message = "Invalid credentials";
                throw new Error(message);
            }
            const authenticator = new authenticator_1.Authenticator();
            const token = authenticator.generateToken({
                id: user.id,
            });
            return token;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UsersBusiness.js.map