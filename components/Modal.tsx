import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Prompt } from "@types";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

const Modal = ({
	promptData,
	setModal,
}: {
	promptData: Prompt;
	setModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const { register, handleSubmit } = useForm();
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: any) =>
			fetch(`/api/prompts/${promptData._id}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: data.prompt,
					tag: data.tag,
				}),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["prompts"] });
			queryClient.invalidateQueries({ queryKey: ["profilePrompts"] });
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			await mutate(data);
			setModal(false);
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<>
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<form
						onSubmit={onSubmit}
						className="w-full max-w-2xl flex flex-col gap-7 glassmorphism"
					>
						<textarea
							className="textarea"
							{...register("prompt", { value: promptData.prompt })}
						></textarea>
						<input
							className="input"
							{...register("tag", { value: promptData.tag })}
						></input>
						<div className="flex">
							<label
								htmlFor="my-modal"
								onClick={() => setModal(false)}
								className="btn btn-sm w-1/2"
							>
								Cancel
							</label>
							<button type="submit" className={`btn btn-sm w-1/2`}>
								<label htmlFor="my-modal">Submit</label>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Modal;
