"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";
import { TPrompt } from "@types";

type FormData = { prompt: string };
const Feed = () => {
	const [prompts, setPrompts] = useState([]);
	const { register, watch, setValue } = useForm<FormData>();
	useEffect(() => {
		const getAllPrompts = async () => {
			const res = await fetch("api/prompts");
			const data = await res.json();

			setPrompts(data);
		};
		getAllPrompts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					placeholder="Search for a tag or proompter's name"
					className="search_input peer"
					{...register("prompt")}
				></input>
			</form>
			<PromptList
				prompts={prompts}
				handleTagSearch={(tag) => setValue("prompt", tag)}
				watchSearch={watch("prompt")}
			></PromptList>
		</section>
	);
};

export default Feed;
