import { usePageStore } from "@context/pageStore";
import { Prompt } from "@types";
import React from "react";

const Pagination = ({ filteredData }: { filteredData: Prompt[] }) => {
	const setCurrentPage = usePageStore((state) => state.setCurrentPage);
	const currentPage = usePageStore((state) => state.currentPage);

	return (
		<div className="btn-group">
			<button
				className="btn"
				onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
			>
				«
			</button>
			<button className="btn">{currentPage}</button>
			<button
				className="btn"
				onClick={() =>
					Math.ceil(filteredData.length / 6) > currentPage &&
					setCurrentPage(currentPage + 1)
				}
			>
				»
			</button>
		</div>
	);
};

export default Pagination;
