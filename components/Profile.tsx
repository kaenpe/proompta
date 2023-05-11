"use client";
import React, { useEffect, useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";

const Feed = ({ prompts }) => {
	const { data: session } = useSession();
	const [searchPrompt, setSearchPrompt] = useState("");
	const handleTagClick = (tag) => {
		setSearchPrompt(tag);
	};

	useEffect(() => {
		console.log(session?.user.id);
	}, [session]);

	return (
		<section className="feed">
			<PromptList
				prompts={prompts}
				handleTagClick={handleTagClick}
				searchPrompt={searchPrompt}
			></PromptList>
		</section>
	);
};

export default Feed;
