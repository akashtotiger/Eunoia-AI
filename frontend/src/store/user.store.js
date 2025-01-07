import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
      // getStorage: () => localStorage,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUser = () => {
  const { user, setUser, clearUser } = useStore();
  return {
    user,
    setUser,
    clearUser,
  };
};
