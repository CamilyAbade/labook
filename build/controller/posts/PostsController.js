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
exports.PostsController = void 0;
const PostsBusiness_1 = require("../../business/posts/PostsBusiness");
class PostsController {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const { photo, description, type, createdAt } = req.body;
                const token = req.headers.authorization;
                const create = {
                    photo,
                    description,
                    createdAt,
                    type,
                    token,
                };
                const postBusiness = new PostsBusiness_1.PostBusiness();
                yield postBusiness.create(create);
                res.status(201).send({ message });
            }
            catch (error) {
                res.statusCode = 400;
                let message = error.sqlMessage || error.message;
                res.send({ message });
            }
        });
    }
    searchPostbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const { id } = req.params;
                const token = req.headers.authorization;
                const searchDTO = {
                    id,
                    token,
                };
                const postBusiness = new PostsBusiness_1.PostBusiness();
                const post = yield postBusiness.searchPostById(searchDTO);
                res.status(200).send({ message, post });
            }
            catch (error) {
                res.statusCode = 400;
                if (error.message === "Post not found") {
                    res.statusCode = 404;
                }
                let message = error.sqlMessage || error.message;
                res.send({ message });
            }
        });
    }
}
exports.PostsController = PostsController;
//# sourceMappingURL=PostsController.js.map