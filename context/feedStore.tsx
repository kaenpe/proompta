import { TPrompt } from "@types";
import { create } from "zustand";
interface IPromptStore {
	prompts: TPrompt[];
	profilePrompts: TPrompt[];
	setPrompts: (prompt: TPrompt[]) => void;
	setProfilePrompts: (prompt: TPrompt[]) => void;
}
export const usePromptStore = create<IPromptStore>((set) => ({
	prompts: [],
	profilePrompts: [],
	setPrompts: (data) => set(() => ({ prompts: data })),
	setProfilePrompts: (data) => set(() => ({ profilePrompts: data })),
}));
