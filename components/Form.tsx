"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
	firstName: string;
	lastName: string;
};

export default function Form() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();
	const onSubmit = handleSubmit((data) => console.log(data));
	// firstName and lastName will have correct type
	console.log(watch("firstName"));
	return (
		<form onSubmit={onSubmit}>
			<label>First Name</label>
			<input {...register("firstName")} />
			<label>Last Name</label>
			<input {...register("lastName")} />
			<button
				type="button"
				onClick={() => {
					setValue("lastName", "luo"); // ✅
				}}
			>
				SetValue
			</button>
		</form>
	);
}
