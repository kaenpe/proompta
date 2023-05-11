import React from "react";
import Card from "./Card";

const PromptList = ({ prompts, handleTagClick, searchPrompt }) => {
	const filteredData = prompts.filter(
		({ tag, creator }) =>
			creator.username === searchPrompt || tag === searchPrompt
	);

	const renderPrompts = () => {
		if (searchPrompt === "")
			return prompts.map((promptData) => (
				<Card
					key={promptData._id}
					promptData={promptData}
					handleTagClick={handleTagClick}
					searchPrompt={searchPrompt}
				></Card>
			));
		else
			return filteredData.map((promptData) => (
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
