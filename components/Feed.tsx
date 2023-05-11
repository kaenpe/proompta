"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";

type FormData = { prompt: string };
const Feed = () => {
	const [prompts, setPrompts] = useState([]);
	const [searchPrompt, setSearchPrompt] = useState("");
	const { register } = useForm<FormData>();
	const handleTagClick = (tag: string) => {
		setSearchPrompt(tag);
	};

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();

		setPrompts(data);
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					placeholder="Search for a tag or proompter's name"
					className="search_input peer"
					{...(register("prompt"),
					{
						onChange: (e) => {
							setSearchPrompt(e.currentTarget.value);
						},
					})}
				></input>
			</form>
			<PromptList
				prompts={prompts}
				handleTagClick={handleTagClick}
				searchPrompt={searchPrompt}
			></PromptList>
		</section>
	);
};

export default Feed;
