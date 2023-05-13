import React from "react";
import Profile from "@components/Profile";
import { Prompt } from "@types";
export async function generateStaticParams() {
	const prompts = await fetch("http://localhost:3000/api/prompts").then((res) =>
		res.json()
	);
	return prompts.map((prompt: Prompt) => ({
		id: prompt.creator._id,
	}));
}

const page = () => {
	return <Profile></Profile>;
};

export default page;
