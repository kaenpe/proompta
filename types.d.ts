import { NextApiRequest } from "next";
import { Session } from "next-auth";

export type TPrompt = {
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
};

export type TStaticParams = {
	prompt: {
		creator: {
			_id: string;
		};
	};
};

export interface INewRequest extends NextApiRequest {
	json: () => {
		userId?: string;
		prompt?: string;
		tag?: string;
	}; // or any other type
}
