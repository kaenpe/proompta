import { TPrompt } from "@types";
import { create } from "zustand";
interface IPromptStore {
	prompts: TPrompt[];
	profilePrompts: TPrompt[];
	setPrompts: (prompt: TPrompt[]) => void;
	setProfilePrompts: (prompt: TPrompt[]) => void;
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
