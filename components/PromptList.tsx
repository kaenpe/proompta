import React from "react";
import Card from "./Card";

const PromptList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((el, id) => (
				<Card key={id} prompt={el.prompt}></Card>
			))}
		</div>
	);
};

export default PromptList;
