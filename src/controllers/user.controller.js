import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserById, getToken, returnableUser } from "../services/user.service.js";
import { sendInviteMail } from "../utils/sendMail.js";

export const getUser = async (req, res) => {
	const returnUser = returnableUser(req.user);
	res.status(200).json({ message: "User found successfully", user: returnUser });
};

export const registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

	const { name, email, password } = req.body;

	try {
		const userExists = await findUserByEmail(email);
		if (userExists) return res.status(400).json({ message: "User already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await createUser(name, email, hashedPassword);
		if (!user) return res.status(500).json({ message: "Unable to create user, try again" });

		const returnUser = returnableUser(user);
		const token = getToken(user._id, "30d");

		res.status(201).json({ message: "User registered successfully", user: returnUser, token });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};

export const loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

	const { email, password } = req.body;

	try {
		const user = await findUserByEmail(email);
		if (!user) return res.status(404).json({ message: "Invalid credentials" });

		const arePasswordsSame = await bcrypt.compare(password, user.password);
		if (!arePasswordsSame) return res.status(404).json({ message: "Invalid credentials" });

		const returnUser = returnableUser(user);
		const token = getToken(user._id, "30d");

		res.status(200).json({ message: "User logged in successfully", user: returnUser, token });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};

export const forgotPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

	const { email } = req.body;

	try {
		const user = await findUserByEmail(email);
		if (!user) return res.status(404).json({ message: "User not found" });

		const resetToken = getToken(user._id, "15m");

		const isMailSent = await sendInviteMail(user.name, email, resetToken);
		if (!isMailSent) return res.status(500).json({ message: "Unable to send mail, please try again" });

		res.status(200).json({ message: "Check your email for password reset link" });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};

export const resetPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

	const { password } = req.body;
	const { token } = req.params;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await findUserById(decoded.id);
		if (!user) return res.status(400).json({ message: "Invalid or expired token" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user.password = hashedPassword;
		await user.save();

		res.status(200).json({ message: "Password has been reset successfully" });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};
