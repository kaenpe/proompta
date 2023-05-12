"use client";
import React, { useEffect, useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";

const Profile = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const [profilePrompts, setProfilePrompts] = useState([]);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const id = searchParams.get("id");
	const { data: session } = useSession();
	const handleTagSearch = (tag: string) => {
		setSearchPrompt(tag);
	};
	useEffect(() => {
		const getProfilePrompts = async () => {
			const prompts = await fetch(
				`http://localhost:3000/api/profiles/${
					pathname === "/profile" ? session?.user.id : id
				}/prompts`
			);
			const data = await prompts.json();
			setProfilePrompts(data);
		};

		getProfilePrompts();
	}, [id, pathname, session?.user.id]);

	if (pathname === "/profile" && !session) return <p>Cannot access profile</p>;

	return (
		<section className="feed">
			<PromptList
				prompts={profilePrompts}
				handleTagSearch={handleTagSearch}
				watchSearch={searchPrompt}
			></PromptList>
		</section>
	);
};

export default Profile;
