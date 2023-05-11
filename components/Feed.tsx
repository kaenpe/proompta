"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";
import { TPrompt } from "@types";

type FormData = { prompt: string };
const Feed = ({ prompts }: { prompts: TPrompt[] }) => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const { register } = useForm<FormData>();
	const handleTagClick = (tag: string) => {
		setSearchPrompt(tag);
	};

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
