"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";

type FormData = { prompt: string };
const Feed = ({ prompts }) => {
	const [searchPrompt, setSearchPrompt] = useState("");

	const { register } = useForm<FormData>();

	return (
		<section className="feed">
			<p>{searchPrompt}</p>
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
			<PromptList prompts={prompts} handleTagClick={searchPrompt}></PromptList>
		</section>
	);
};

export default Feed;
