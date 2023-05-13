import { Prompt } from "@types";
import { create } from "zustand";
interface IPromptStore {
	prompts: Prompt[];
	profilePrompts: Prompt[];
	setPrompts: (prompt: Prompt[]) => void;
	setProfilePrompts: (prompt: Prompt[]) => void;
	filterPrompts: (id: string) => void;
}
export const usePromptStore = create<IPromptStore>((set) => ({
	prompts: [],
	profilePrompts: [],
	setPrompts: (prompt) => set(() => ({ prompts: prompt })),
	setProfilePrompts: (prompt) => set(() => ({ profilePrompts: prompt })),
	filterPrompts: (id) =>
		set((state) => ({
			profilePrompts: state.profilePrompts.filter((el) => el._id !== id),
			prompts: state.prompts.filter((el) => el._id !== id),
		})),
}));
