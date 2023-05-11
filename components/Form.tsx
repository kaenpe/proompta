"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

type TFormProps = {
	prompt: string;
	tag: string;
};

interface IForm {
	type: string;
}
export default function Form({ type }: IForm) {
	const { data: session } = useSession();
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<TFormProps>();
	const onSubmit = handleSubmit(async (data) => {
		try {
			const response = await fetch("/api/prompt/new", {
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
		} finally {
			setSubmitting(false);
		}
	});
	// firstName and lastName will have correct type
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="red_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				Show others your prompting skills.
			</p>
			<form
				onSubmit={onSubmit}
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
						className="form_textarea"
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
						className="form_input"
					></input>
				</label>
				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/">
						<button className="outline_btn text-sm">Cancel</button>
					</Link>
					{submitting ? (
						<button type="submit" className="px-5 py-1.5 text-sm black_btn">
							Saving...
						</button>
					) : (
						<button
							type="submit"
							onClick={() => setSubmitting(true)}
							className="px-5 py-1.5 text-sm black_btn"
						>
							Submit
						</button>
					)}
				</div>
			</form>
		</section>
	);
}
