"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostsController_1 = require("../controller/posts/PostsController");
exports.postsRouter = express_1.default.Router();
const postsController = new PostsController_1.PostsController();
exports.postsRouter.post("/create", postsController.createPost);
exports.postsRouter.get("/:id", postsController.searchPostbyId);
//# sourceMappingURL=posts.js.map