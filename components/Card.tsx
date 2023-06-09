"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Prompt } from "@types";
import Link from "next/link";
import { TiDeleteOutline, TiEdit, TiTick } from "react-icons/ti";
import { MdOutlineContentCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { TFormProps } from "./Form";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";

const Card = ({
	promptData,
	handleTagSearch,
	watchSearch,
}: {
	promptData: Prompt;
	handleTagSearch: (arg: string) => void;
	watchSearch: string;
}) => {
	const { data: session } = useSession();
	const queryClient = useQueryClient();
	const [modal, setModal] = useState(false);
	const [copied, setCopied] = useState("");
	const handleCopy = ({ prompt }: { prompt: string }) => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => {
			setCopied("");
		}, 1000);
	};

	const handleDelete = async () => {
		const res = await fetch(`/api/prompts/${promptData._id}`, {
			method: "DELETE",
		});
		const data = await res.json();

		return data;
	};

	const mutation = useMutation({
		mutationFn: handleDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["prompts"] });
			queryClient.invalidateQueries({ queryKey: ["profilePrompts"] });
		},
	});

	return (
		<>
			<div className="prompt_card mb-3 hover:bg-gradient-to-r from-slate-950/30 via-slate-800/30 to-slate-950/30">
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
								href={`/profile/${promptData.creator.username}?id=${promptData.creator._id}`}
							>
								<h3 className="transition-all hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-rose-800 via-rose-600 to-rose-900 font-satoshi font-semibold text-gray-900">
									{promptData.creator.username}
								</h3>
							</Link>
						</div>
					</div>
					<div
						className="btn btn-circle btn-sm"
						onClick={() => handleCopy(promptData)}
					>
						{copied === promptData.prompt ? (
							<TiTick />
						) : (
							<MdOutlineContentCopy />
						)}
					</div>

					{session?.user.id === promptData.creator._id && (
						<>
							<div
								className="btn btn-circle btn-sm hover:btn-error"
								onClick={() =>
									confirm("Delete your prompt?") && mutation.mutate()
								}
							>
								<TiDeleteOutline className="w-4 h-4" />
							</div>

							<label
								htmlFor="my-modal"
								className="btn btn-circle btn-sm"
								onClick={() => setModal(true)}
							>
								<TiEdit className="w-4 h-4" />
							</label>
						</>
					)}
				</div>

				<p className="my-4 font-satoshi text-sm  text-slate-800">
					{promptData.prompt}
				</p>
				<p
					className="transition-all font-inter text-sm text-slate-950 hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-rose-800 via-rose-500 to-rose-900  cursor-pointer"
					onClick={
						watchSearch !== promptData.tag
							? () => handleTagSearch(promptData.tag)
							: () => handleTagSearch("")
					}
				>
					{promptData.tag}
				</p>
			</div>
			{modal && <Modal promptData={promptData} setModal={setModal}></Modal>}
		</>
	);
};

export default Card;
