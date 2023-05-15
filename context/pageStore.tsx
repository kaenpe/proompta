import { create } from "zustand";
interface IPageStore {
	setCurrentPage: (page: number) => void;
	currentPage: number;
}
export const usePageStore = create<IPageStore>((set) => ({
	currentPage: 1,
	setCurrentPage: (page) => set(() => ({ currentPage: page })),
}));
