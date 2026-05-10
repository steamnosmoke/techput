
import { create } from "zustand";

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

interface ChatStore {
  messages: ChatMessage[];

  isLoading: boolean;

  addMessage: (message: ChatMessage) => void;

  setLoading: (value: boolean) => void;

  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  isLoading: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setLoading: (value) =>
    set({
      isLoading: value,
    }),

  clearChat: () =>
    set({
      messages: [],
    }),
}));
