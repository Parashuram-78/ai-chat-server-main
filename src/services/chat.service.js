import Chat from "../models/Chat.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getChatForUserId = async userId => {
	try {
		return await Chat.findOne({ user: userId });
	} catch {
		return null;
	}
};

export const getChatById = async chatId => {
	try {
		return await Chat.findById(chatId);
	} catch {
		return null;
	}
};

export const createChat = async userId => {
	try {
		return await Chat.create({ user: userId });
	} catch {
		return null;
	}
};

export const verifyToken = async token => {
	if (!token) return null;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return await User.findById(decoded.id).select("-password");
	} catch {
		return null;
	}
};
