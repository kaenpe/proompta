import React from "react";
import Card from "./Card";

const PromptList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map(({ creator, prompt, tag }) => {
				return (
					<p>
						{prompt} {tag}
					</p>
				);
			})}
		</div>
	);
};

export default PromptList;
