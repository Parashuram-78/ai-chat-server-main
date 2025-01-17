import { Router } from "express";
import { askAI, getChat, getUserChat } from "../controllers/chat.controller.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.get("/ask-ai", askAI);
router.get("/:id", protect, getChat);
router.get("/", protect, getUserChat);

export default router;
