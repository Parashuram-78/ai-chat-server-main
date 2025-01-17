import { Router } from "express";
import {
	forgotPasswordValidator,
	loginUserValidator,
	registerUserValidator,
	resetPasswordValidator,
} from "../validators/user.validator.js";
import { forgotPassword, getUser, loginUser, registerUser, resetPassword } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.post("/forgot-password", forgotPasswordValidator, forgotPassword);
router.put("/reset-password/:token", resetPasswordValidator, resetPassword);
router.get("/", protect, getUser);

export default router;
