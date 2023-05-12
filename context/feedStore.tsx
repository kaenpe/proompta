import { TPrompt } from "@types";
import { create } from "zustand";
interface IPromptStore {
	prompts: TPrompt[];
	setPrompts: (prompt: TPrompt) => void;
}
export const usePromptStore = create<IPromptStore>((set) => ({
	prompts: [],
	setPrompts: (data) => set((state) => ({ prompts: [...state.prompts, data] })),
}));
