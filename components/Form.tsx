"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export type TFormProps = {
	prompt: string;
	tag: string;
};

export default function Form() {
	const { data: session } = useSession();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
	} = useForm<TFormProps>();
	const onSubmit = async (data: TFormProps) => {
		try {
			const response = await fetch("/api/prompts/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: data.prompt,
					userId: session?.user?.id,
					tag: data.tag,
				}),
			});

			response.ok && router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="red_gradient">Create Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				Show others your prompting skills.
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>

					<textarea
						{...register("prompt")}
						placeholder="Prompt here..."
						required
						className="textarea"
					></textarea>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag
					</span>

					<input
						{...register("tag")}
						placeholder="#tag"
						required
						className="input"
					></input>
				</label>
				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/">
						<button className="btn btn-outline text-sm">Cancel</button>
					</Link>
					{isSubmitting ? (
						<button type="submit" className="btn btn-info">
							Saving
						</button>
					) : isSubmitSuccessful ? (
						<button type="submit" className="btn btn-success">
							Saved
						</button>
					) : (
						<button type="submit" className="btn">
							Submit
						</button>
					)}
				</div>
			</form>
		</section>
	);
}
