import { app } from "./controller/app";
import { userRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";

app.use("/users", userRouter);
app.use("/posts", postsRouter);