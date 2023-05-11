import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { IGetNewPromptRequest } from "@types";

export const POST = async (req: IGetNewPromptRequest) => {
	const { userId, prompt, tag } = req.json();

	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response("Failed to create prompt", { status: 500 });
	}
};
