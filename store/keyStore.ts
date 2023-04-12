import { create } from "zustand";

interface KeyState {
  isPress: boolean;
  setIsPress: (isPress: boolean) => void;
}
export const useKeyStore = create<KeyState>()((set) => ({
  isPress: false,
  setIsPress: (isPress) => set(() => ({ isPress })),
}));
