import React from "react";
import Profile from "@components/Profile";
import { Prompt } from "@types";
export async function generateStaticParams() {
	const prompts = await fetch(`${process.env.API_URL}/api/prompts`).then(
		(res) => res.json()
	);
	return prompts.map((prompt: Prompt) => ({
		id: prompt.creator._id,
	}));
}

const getProfilePrompts = async (id: string) => {
	const res = await fetch(`${process.env.API_URL}/api/profiles/${id}/prompts`, {
		next: { revalidate: 10 },
	});

	if (!res.ok) console.log("error");
	return res.json();
};
const page = async ({ params }: { params: { id: string } }) => {
	const data = await getProfilePrompts(params.id);

	return <Profile params={data}></Profile>;
};

export default page;
