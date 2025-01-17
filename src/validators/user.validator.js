import { body } from "express-validator";

export const registerUserValidator = [
	body("name").notEmpty().withMessage("Name is required"),

	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const loginUserValidator = [
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const forgotPasswordValidator = [
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email"),
];

export const resetPasswordValidator = [
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
