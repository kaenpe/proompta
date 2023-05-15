"use client";
import React, { useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { FormData } from "@types";

const Profile = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const id = searchParams.get("id");
	const { data: session } = useSession();
	const handleTagSearch = (tag: string) => {
		setSearchPrompt(tag);
	};
	const getProfilePrompts = async () => {
		const res = await fetch(
			`../api/profiles/${
				pathname === "/profile" ? session?.user.id : id
			}/prompts`
		);
		const data = await res.json();
		return data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ["profilePrompts"],
		queryFn: getProfilePrompts,
	});
	const { register, watch, setValue } = useForm<FormData>();

	if (pathname === "/profile" && !session) return <p>Cannot access profile</p>;

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					placeholder="Search through tag or prompt"
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
export default Profile;
