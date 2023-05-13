"use client";
import React, { useEffect, useState } from "react";
import PromptList from "./PromptList";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { usePromptStore } from "@context/promptStore";

const Profile = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const profilePrompts = usePromptStore((state) => state.profilePrompts);
	const setProfilePrompts = usePromptStore((state) => state.setProfilePrompts);
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const id = searchParams.get("id");
	const { data: session } = useSession();
	const handleTagSearch = (tag: string) => {
		setSearchPrompt(tag);
	};
	useEffect(() => {
		const getProfilePrompts = async () => {
			const res = await fetch(`../api/profiles/${id}/prompts`);
			const data = await res.json();
			setProfilePrompts(data);
		};

		getProfilePrompts();
	}, [id, pathname, session?.user.id, setProfilePrompts]);

	if (pathname === "/profile" && !session) return <p>Cannot access profilse</p>;

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
