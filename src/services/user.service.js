import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const findUserByEmail = async email => {
	try {
		return await User.findOne({ email });
	} catch {
		return null;
	}
};

export const findUserById = async id => {
	try {
		return await User.findById(id);
	} catch {
		return null;
	}
};

export const createUser = async (name, email, password) => {
	try {
		return await User.create({ name, email, password });
	} catch {
		return null;
	}
};

export const returnableUser = user => {
	try {
		const userObj = user.toObject();
		delete userObj.password;
		return userObj;
	} catch {
		return null;
	}
};

export const getToken = (userId, expiresIn) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};
