"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";
import { Prompt } from "@types";
import { usePromptStore } from "@context/promptStore";

type FormData = { prompt: string };
const Feed = ({ prompts }: { prompts: Prompt[] }) => {
	const { register, watch, setValue } = useForm<FormData>();

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
