import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});