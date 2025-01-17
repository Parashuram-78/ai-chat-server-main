import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiModel = () => {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	return model;
};
