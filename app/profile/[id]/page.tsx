import React from "react";
import { TUser } from "@consts/users";
import Profile from "@components/Profile";
import getProfilePrompts from "@lib/getProfilePrompts";

export const generateStaticParams = async () => {
	const prompts = await fetch("http://localhost:3000/api/prompt");
	const res = await prompts.json();

	return res.map((prompt) => ({ id: prompt.creator.id }));
};

type TParams = {
	id: string;
};
const page = async ({ params: { id } }: { params: { id: string } }) => {
	const promptData: Promise<TUser[]> = getProfilePrompts(id);
	const prompts = await promptData;
	return <Profile prompts={prompts}></Profile>;
};

export default page;
