import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
};

// Helper to apply theme class on <html>
function applyThemeClass(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme: Theme) => {
        applyThemeClass(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },

      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        applyThemeClass(newTheme);
        localStorage.setItem("vite-ui-theme", newTheme);
        set({ theme: newTheme });
      },

      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("vite-ui-theme") as Theme | null;
          const themeToApply = stored ?? "light";
          applyThemeClass(themeToApply);
          set({ theme: themeToApply });
        }
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
