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
