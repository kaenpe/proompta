"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";

type FormData = { prompt: string };
const Feed = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const [prompts, setPrompts] = useState("");
	useEffect(() => {
		const getPrompts = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			setPrompts(data);
		};
		getPrompts();
	}, []);

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit = handleSubmit((data) => console.log(data));
	// firstName and lastName will have correct type
	return (
		<section className="feed">
			<form className="relative w-full flex-center" onSubmit={onSubmit}>
				<input
					placeholder="Search for a tag or proompter's name"
					className="search_input peer"
					{...register("prompt")}
					onChange={() => setSearchPrompt(watch("prompt"))}
				></input>
			</form>
			<PromptList data={prompts} handleTagClick={() => {}}></PromptList>
		</section>
	);
};

export default Feed;
