import React from "react";
import Card from "./Card";
import { TPrompt } from "@types";

const PromptList = ({
	prompts,
	handleTagClick,
	searchPrompt,
}: {
	prompts: TPrompt[];
	handleTagClick: (arg: string) => void;
	searchPrompt: string;
}) => {
	const filteredData = prompts.filter(
		({ tag, creator }: TPrompt) =>
			creator.username === searchPrompt || tag === searchPrompt
	);

	const renderPrompts = () => {
		if (searchPrompt === "")
			return prompts.map((promptData: TPrompt) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagClick={handleTagClick}
					searchPrompt={searchPrompt}
				></Card>
			));
		else
			return filteredData.map((promptData: TPrompt) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagClick={handleTagClick}
					searchPrompt={searchPrompt}
				></Card>
			));
	};
	return <div className="mt-16 prompt_layout">{renderPrompts()}</div>;
};

export default PromptList;
