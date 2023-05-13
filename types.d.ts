import { NextApiRequest } from "next";
import { Session } from "next-auth";

export interface Prompt {
	_id: string;
	creator: {
		_id: string;
		email: string;
		username: string;
		image: string;
		__v: number;
	};
	prompt: string;
	tag: string;
	__v: number;
}

export interface TStaticParams {
	prompt: {
		creator: {
			_id: string;
		};
	};
}
export interface TProviderProps {
	callbackUrl: string;
	id: string;
	name: string;
	signinUrl: string;
	type: string;
}
export interface INewRequest extends NextApiRequest {
	json: () => {
		userId?: string;
		prompt?: string;
		tag?: string;
	}; // or any other type
}
