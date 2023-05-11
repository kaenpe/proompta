import React from "react";
import Profile from "@components/Profile";
import { TPrompt } from "@types";
export const generateStaticParams = async () => {
	const prompts = await fetch("http://localhost:3000/api/prompt");
	const res = await prompts.json();

	return res.map((prompt: TPrompt) => ({ id: prompt.creator._id }));
};
const page = async ({ params }: { params: { id: string } }) => {
	const parameters = params;
	return <Profile params={parameters}></Profile>;
};

export default page;
