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
exports.PostBusiness = void 0;
const Postsdatabase_1 = require("../../data/posts/Postsdatabase");
const UsersDatabase_1 = require("../../data/users/UsersDatabase");
const authenticator_1 = require("../../services/authenticator");
const idGenarator_1 = require("../../services/idGenarator");
class PostBusiness {
    create({ photo, description, type, createdAt, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticationData = new authenticator_1.Authenticator();
            const tokenData = authenticationData.getTokenData(token);
            const idGenerator = new idGenarator_1.IdGenerator();
            const id = idGenerator.generateId();
            const post = {
                photo,
                description,
                createdAt,
                type,
                authorId: tokenData.id,
                id,
            };
            const postDatabase = new Postsdatabase_1.PostDatabase();
            yield postDatabase.create(post);
        });
    }
    searchPostById({ id, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticationData = new authenticator_1.Authenticator();
            const tokenData = authenticationData.getTokenData(token);
            const userDatabase = new UsersDatabase_1.UserDatabase();
            const queryId = yield userDatabase.findById(tokenData.id);
            if (!queryId[0]) {
                throw new Error("Invalid token");
            }
            const postDatabase = new Postsdatabase_1.PostDatabase();
            const queryResult = yield postDatabase.findById(id);
            console.log(queryResult);
            if (!queryResult[0]) {
                const message = "Post not found";
                throw new Error(message);
            }
            const post = {
                id: queryResult[0].id,
                photo: queryResult[0].photo,
                description: queryResult[0].description,
                type: queryResult[0].type,
                createdAt: queryResult[0].created_at,
                authorId: queryResult[0].author_id,
            };
            return post;
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostsBusiness.js.map