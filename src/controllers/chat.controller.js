import { validationResult } from "express-validator";
import { createChat, getChatById, getChatForUserId, verifyToken } from "../services/chat.service.js";
import { getGeminiModel } from "../utils/gemini.js";

export const getUserChat = async (req, res) => {
	try {
		const chat = await getChatForUserId(req.user._id);
		if (!chat) {
			const newChat = await createChat(req.user._id);
			return res.status(201).json({ message: "Chat created successfully", chat: newChat });
		}

		res.status(200).json({ message: "Chat found successfully", chat });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};

export const getChat = async (req, res) => {
	const { chatId } = req.params;

	try {
		const chat = await getChatById(chatId);
		if (!chat) return res.status(404).json({ message: "Chat not found" });
		res.status(200).json({ message: "Chat found successfully", chat });
	} catch (error) {
		res.status(500).json({ message: error?.message ?? "Internal Server Error" });
	}
};

export const askAI = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

	const prompt = req.query.prompt;
	if (!prompt) return res.status(400).json({ message: "Please enter a prompt" });

	const token = req.query.token;
	let user = null;
	try {
		user = await verifyToken(token);
	} catch {
		return res.status(404).json({ message: "Unauthorized" });
	}

	if (!user) return res.status(404).json({ message: "Unauthorized" });

	try {
		let chat = await getChatForUserId(user._id);
		if (!chat) chat = await createChat(user._id);

		const geminiModel = getGeminiModel();
		const result = await geminiModel.generateContentStream(prompt);

		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		res.write(`data: ${JSON.stringify({ event: "start", message: "Stream Started" })}\n\n`);

		let modelResponse = "";
		for await (const chunk of result.stream) {
			const text = chunk.text();
			modelResponse += text;
			res.write(`data: ${JSON.stringify({ event: "chunk", text })}\n\n`);
		}

		chat.chats.push({ role: "user", text: prompt });
		chat.chats.push({ role: "model", text: modelResponse });
		await chat.save();

		res.write(`data: ${JSON.stringify({ event: "end", message: "Stream Finished" })}\n\n`);
		res.end();
	} catch (error) {
		res.write(`data: ${JSON.stringify({ event: "error", message: error?.message ?? "Internal Server Error" })}\n\n`);
		res.end();
	}
};
