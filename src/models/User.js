import { model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: [true, "Please add your name"] },
		email: { type: String, required: [true, "Please add your email"], unique: true },
		password: { type: String, required: [true, "Please add password"] },
	},
	{ timestamps: true },
);

export default model("User", userSchema);
