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
import { usePromptStore } from "@context/promptStore";
import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

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
	const [editing, setEditing] = useState(false);
	const queryClient = useQueryClient();
	const [copied, setCopied] = useState("");
	const { register, handleSubmit } = useForm<TFormProps>();
	const handleCopy = ({ prompt }: { prompt: string }) => {
		setCopied(prompt);
		navigator.clipboard.writeText(prompt);
		setTimeout(() => {
			setCopied("");
		}, 1000);
	};
	const router = useRouter();

	const handleDelete = useMutation({
		mutationFn: () => {
			return fetch(`/api/prompts/${promptData._id}`, {
				method: "DELETE",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["prompts"] });
			queryClient.invalidateQueries({ queryKey: ["profilePrompts"] });
		},
	});
	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await fetch(`/api/prompts/${promptData._id}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: data.prompt,
					tag: data.tag,
				}),
			});

			response.ok && setEditing(false);
		} catch (error) {
			console.log(error);
		} finally {
			router.refresh();
		}
	});
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
							href={`/profile/${promptData.creator.username}?id=${promptData.creator._id}`}
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
					<>
						<div className="copy_btn" onClick={() => handleDelete.mutate()}>
							<TiDeleteOutline />
						</div>

						{editing ? (
							<div className="copy_btn" onClick={() => setEditing(false)}>
								<RxCross2 />
							</div>
						) : (
							<div className="copy_btn" onClick={() => setEditing(true)}>
								<TiEdit />
							</div>
						)}
					</>
				)}
			</div>
			{editing ? (
				<form
					onSubmit={onSubmit}
					className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				>
					<textarea
						className="form_textarea"
						{...register("prompt", { value: promptData.prompt })}
					></textarea>
					<input
						className="form_input"
						{...register("tag", { value: promptData.tag })}
					></input>
					<button type="submit" className="px-5 py-1.5 text-sm black_btn">
						Submit
					</button>
				</form>
			) : (
				<>
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
				</>
			)}
		</div>
	);
};

export default Card;
