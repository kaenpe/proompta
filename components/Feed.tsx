"use client";
import React from "react";
import { useForm } from "react-hook-form";
import PromptList from "./PromptList";
import { FadeLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { FormData } from "@types";

const Feed = () => {
	const { register, watch, setValue } = useForm<FormData>({
		defaultValues: {
			prompt: "",
		},
	});
	const getAllPrompts = async () => {
		const res = await fetch("api/prompts");
		const data = await res.json();
		return data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ["prompts"],
		queryFn: getAllPrompts,
	});

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					placeholder="Search for a tag or proompter's name"
					className="input peer"
					{...register("prompt")}
				></input>
			</form>
			{isLoading ? (
				<FadeLoader color={"rgb(30 41 59)"} />
			) : (
				<PromptList
					prompts={data}
					handleTagSearch={(tag) => setValue("prompt", tag)}
					watchSearch={watch("prompt")}
				></PromptList>
			)}
		</section>
	);
};

export default Feed;
