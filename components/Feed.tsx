"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";

import { usePromptStore } from "@context/promptStore";
import { useQuery } from "@tanstack/react-query";

type FormData = { prompt: string };
const Feed = () => {
	const { register, watch, setValue } = useForm<FormData>();
	const getAllPrompts = async () => {
		const res = await fetch("api/prompts");
		const data = await res.json();
		return data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ["prompts"],
		queryFn: getAllPrompts,
	});

	if (isLoading) return <p>dog</p>;
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
				prompts={data}
				handleTagSearch={(tag) => setValue("prompt", tag)}
				watchSearch={watch("prompt")}
			></PromptList>
		</section>
	);
};

export default Feed;
