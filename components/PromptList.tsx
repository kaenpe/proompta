import React from "react";
import Card from "./Card";
import { TPrompt } from "@types";

const PromptList = ({
	prompts,
	handleTagSearch,
	watchSearch,
}: {
	prompts: TPrompt[];
	handleTagSearch: (arg: string) => void;
	watchSearch: string;
}) => {
	const filteredData = prompts.filter(
		({ tag, creator }: TPrompt) =>
			creator.username === watchSearch || tag === watchSearch
	);

	const renderPrompts = () => {
		if (watchSearch === undefined || watchSearch === "")
			return prompts.map((promptData: TPrompt) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagSearch={handleTagSearch}
					watchSearch={watchSearch}
				></Card>
			));
		else
			return filteredData.map((promptData: TPrompt) => (
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
