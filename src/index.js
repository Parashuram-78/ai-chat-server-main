import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/database.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.get("/api/health", (_, res) => {
	res.status(200).json({ message: "Working perfectly" });
});

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
