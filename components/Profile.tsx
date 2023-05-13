"use client";
import React, { useState } from "react";
import PromptList from "./PromptList";
import { Prompt } from "@types";

const Profile = ({ params }: { params: Prompt[] }) => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const handleTagSearch = (tag: string) => {
		setSearchPrompt(tag);
	};

	return (
		<section className="feed">
			<PromptList
				prompts={params}
				handleTagSearch={handleTagSearch}
				watchSearch={searchPrompt}
			></PromptList>
		</section>
	);
};

export default Profile;
