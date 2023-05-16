import React, { useEffect } from "react";
import Card from "./Card";
import { Prompt } from "@types";
import { usePageStore } from "@context/pageStore";
import Pagination from "./Pagination";

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
			creator.username.toLowerCase().includes(watchSearch.toLowerCase()) ||
			tag.toLowerCase().includes(watchSearch.toLowerCase()) ||
			prompt.toLowerCase().includes(watchSearch.toLowerCase())
	);

	const currentPage = usePageStore((state) => state.currentPage);
	const setCurrentPage = usePageStore((state) => state.setCurrentPage);
	useEffect(() => {
		setCurrentPage(1);
	}, [watchSearch, setCurrentPage]);

	const renderPrompts = () => {
		return filteredData.map((promptData: Prompt, id) => {
			if (id < currentPage * 3 && id >= currentPage * 3 - 3)
				return (
					<Card
						key={promptData._id}
						promptData={promptData}
						handleTagSearch={handleTagSearch}
						watchSearch={watchSearch}
					></Card>
				);
		});
	};

	return (
		<>
			<div className="prompt_layout">{renderPrompts()}</div>
			<Pagination filteredData={filteredData}></Pagination>
		</>
	);
};

export default PromptList;
