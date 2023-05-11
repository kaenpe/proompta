"use client";
import React, { useEffect, useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";

const Profile = () => {
	const { data: session } = useSession();
	const [profilePrompts, setProfilePrompts] = useState([]);
	const [searchPrompt, setSearchPrompt] = useState("");

	const handleTagClick = (tag: string) => {
		setSearchPrompt(tag);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/profiles/${session?.user.id}/prompts`);
			const data = await response.json();

			setProfilePrompts(data);
		};

		if (session?.user.id) fetchPosts();
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
