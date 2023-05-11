import React from "react";
import Card from "./Card";

const PromptList = ({ prompts, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{prompts.map((promptData) => (
				<Card promptData={promptData}></Card>
			))}
		</div>
	);
};

export default PromptList;
