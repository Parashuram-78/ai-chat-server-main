import { model, Schema } from "mongoose";

const chatSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: [true, "Please enter User ID"], unique: true },
		chats: [
			{
				role: { type: String, required: [true, "Please mention role - 'user' or 'model'"] },
				text: { type: String, required: [true, "Please mention the text"] },
				_id: false,
			},
		],
	},
	{ timestamps: true },
);

export default model("Chat", chatSchema);
