import { NextApiRequest } from "next";
import { Session } from "next-auth";

export type TPrompt = {
	map(arg0: (promptData: TPrompt) => import("react").JSX.Element): any;
	filter(arg0: ({ tag, creator }: TPrompt) => boolean): any;
	_id: string;
	never: Array<string>;
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

export interface IGetNewPromptRequest extends NextApiRequest {
	json: () => {
		userId: string;
		prompt: string;
		tag: string;
	}; // or any other type
}
