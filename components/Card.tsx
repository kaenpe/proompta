"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TPrompt } from "@types";
import Link from "next/link";

const Card = ({
	promptData,
	handleTagSearch,
	watchSearch,
}: {
	promptData: TPrompt;
	handleTagSearch: (arg: string) => void;
	watchSearch: string;
}) => {
	const { data: session } = useSession();
	const [copied, setCopied] = useState("");
	const router = useRouter();

	const handleCopy = ({ prompt }: { prompt: string }) => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => {
			setCopied("");
		}, 1000);
	};
	const handleProfileClick = () => {
		console.log(promptData);

		if (promptData.creator._id === session?.user?.id)
			return router.push("/profile");

		router.push(
			`/profile/${promptData.creator._id}?name=${promptData.creator.username}`
		);
	};
	return (
		<div className="prompt_card">
			<div className="flex justify-between items-center gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={promptData.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
					<div className="flex flex-col">
						{/* <Link
							href={
								session?.user.id === promptData.creator._id
									? "/profile"
									: `/profile/${promptData.creator._id}`
							}
							onClick={() =>
								console.log(session?.user.id === promptData.creator._id)
							}
						> */}
						<h3
							onClick={() => console.log(promptData.creator._id)}
							className="transition-all hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-rose-800 via-rose-600 to-rose-900 font-satoshi font-semibold text-gray-900"
						>
							{promptData.creator.username}
						</h3>
						{/* </Link> */}

						<p className="transition-all hover:text-transparent bg-clip-text font-inter text-sm  text-slate-800 hover:bg-gradient-to-r from-rose-800 via-rose-600 to-rose-900">
							{promptData.creator.email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={() => handleCopy(promptData)}>
					<Image
						src={
							copied === promptData.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						width={12}
						height={12}
						alt="copy-icon"
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm  text-slate-800">
				{promptData.prompt}
			</p>
			<p
				className="transition-all font-inter text-sm text-slate-950 hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-rose-800 via-rose-500 to-rose-900  cursor-pointer"
				onClick={
					watchSearch === ""
						? () => handleTagSearch(promptData.tag)
						: () => handleTagSearch("")
				}
			>
				{promptData.tag}
			</p>
		</div>
	);
};

export default Card;
