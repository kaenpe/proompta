"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { TPrompt } from "@types";
import Link from "next/link";
import { TiDeleteOutline, TiTick } from "react-icons/ti";
import { MdOutlineContentCopy } from "react-icons/md";
import { usePromptStore } from "@context/promptStore";

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
	const filterPrompts = usePromptStore((state) => state.filterPrompts);
	const handleCopy = ({ prompt }: { prompt: string }) => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => {
			setCopied("");
		}, 1000);
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/prompts/${promptData._id.toString()}`, {
				method: "DELETE",
			});
		} catch (error) {
			console.log(error);
		}

		filterPrompts(promptData._id);
	};
	return (
		<div className="prompt_card hover:bg-gradient-to-r from-slate-950/30 via-slate-800/30 to-slate-950/30">
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
						<Link
							href={
								session?.user.id === promptData.creator._id
									? "/profile"
									: `/profile/${promptData.creator.username}?id=${promptData.creator._id}`
							}
						>
							<h3 className="transition-all hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-rose-800 via-rose-600 to-rose-900 font-satoshi font-semibold text-gray-900">
								{promptData.creator.username}
							</h3>
						</Link>

						<p className="font-inter text-sm  text-slate-800">
							{promptData.creator.email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={() => handleCopy(promptData)}>
					{copied === promptData.prompt ? <TiTick /> : <MdOutlineContentCopy />}
				</div>

				{session?.user.id === promptData.creator._id && (
					<div className="copy_btn" onClick={handleDelete}>
						<TiDeleteOutline />
					</div>
				)}
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
