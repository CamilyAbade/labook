"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./controller/app");
const users_1 = require("./routes/users");
const posts_1 = require("./routes/posts");
app_1.app.use("/users", users_1.userRouter);
app_1.app.use("/posts", posts_1.postsRouter);
//# sourceMappingURL=index.js.map