"use client";
import React, { useEffect, useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";
import { TPrompt } from "@types";

const Profile = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const [profilePrompts, setProfilePrompts] = useState([]);
	const { data: session } = useSession();
	const handleTagClick = (tag: string) => {
		setSearchPrompt(tag);
	};
	useEffect(() => {
		const getProfilePrompts = async () => {
			const prompts = await fetch(
				`http://localhost:3000/api/profiles/${session?.user.id}/prompts`
			);
			const data = await prompts.json();
			setProfilePrompts(data);
		};

		getProfilePrompts();
	}, [session?.user.id]);

	return (
		<section className="feed">
			<PromptList
				prompts={profilePrompts}
				handleTagClick={handleTagClick}
				searchPrompt={searchPrompt}
			></PromptList>
		</section>
	);
};

export default Profile;
