import React from "react";
import Card from "./Card";
import { Prompt } from "@types";

const PromptList = ({
	prompts,
	handleTagSearch,
	watchSearch,
}: {
	prompts: Prompt[];
	handleTagSearch: (arg: string) => void;
	watchSearch: string;
}) => {
	const filteredData = prompts.filter(
		({ tag, creator, prompt }: Prompt) =>
			creator.username.toLowerCase() === watchSearch ||
			tag.toLowerCase() === watchSearch ||
			prompt.toLowerCase() === watchSearch
	);

	const renderPrompts = () => {
		if (watchSearch === undefined || watchSearch === "")
			return prompts.map((promptData: Prompt) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagSearch={handleTagSearch}
					watchSearch={watchSearch}
				></Card>
			));
		else
			return filteredData.map((promptData: Prompt) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagSearch={handleTagSearch}
					watchSearch={watchSearch}
				></Card>
			));
	};
	return <div className="mt-16 prompt_layout">{renderPrompts()}</div>;
};

export default PromptList;
