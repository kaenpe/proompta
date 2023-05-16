"use client";
import React, { useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";

const Profile = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const { name } = useParams();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const id = searchParams.get("id");
	const { data: session } = useSession();
	const handleTagSearch = (tag: string) => {
		setSearchPrompt(tag);
	};
	const getProfilePrompts = async () => {
		const res = await fetch(`../api/profiles/${id}/prompts`);
		const data = await res.json();
		return data;
	};
	const { data, isLoading } = useQuery({
		queryKey: ["profilePrompts"],
		queryFn: getProfilePrompts,
	});

	if (pathname === "/profile" && !session) return <p>Cannot access profile</p>;

	return (
		<section className="feed">
			{id === session?.user.id ? (
				<>
					<h1 className="red_gradient head_text text-center">
						Browse your profile
					</h1>
				</>
			) : (
				<>
					<h1 className="red_gradient head_text text-center">
						Browsing {name} prompts
					</h1>{" "}
				</>
			)}
			{isLoading ? (
				<FadeLoader color={"rgb(30 41 59)"} />
			) : (
				<PromptList
					prompts={data}
					handleTagSearch={handleTagSearch}
					watchSearch={searchPrompt}
				></PromptList>
			)}
		</section>
	);
};
export default Profile;
