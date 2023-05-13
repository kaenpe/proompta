import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const DELETE = async (
	req: any,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(id);

		return new Response("deleted", { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompts", { status: 500 });
	}
};

export const PATCH = async (
	request: any,
	{ params }: { params: { id: string } }
) => {
	const { prompt, tag } = await request.json();

	try {
		await connectToDB();
		const currentPrompt = await Prompt.findById(params.id);
		!currentPrompt && new Response("No valid prompt", { status: 404 });

		currentPrompt.prompt = prompt;
		currentPrompt.tag = tag;
		await currentPrompt.save();
		return new Response("Edited successfully", { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};
