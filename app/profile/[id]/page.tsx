import React from "react";
import Profile from "@components/Profile";
import { Prompt } from "@types";
export async function generateStaticParams() {
	const prompts = await fetch("https://proompta.vercel.app/api/prompts", {
		next: { revalidate: 3 },
	}).then((res) => res.json());
	return prompts.map((prompt: Prompt) => ({
		id: prompt.creator._id,
	}));
}

const getProfilePrompts = async (id: string) => {
	const data = await fetch(
		`https://proompta.vercel.app/api/profiles/${id}/prompts`,
		{
			cache: "no-store",
		}
	).then((res) => res.json());

	return data;
};
const page = async ({ params }: { params: { id: string } }) => {
	const data = await getProfilePrompts(params.id);

	return <Profile params={data}></Profile>;
};

export default page;
