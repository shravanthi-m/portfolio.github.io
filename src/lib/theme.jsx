import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
    { id: "win98", label: "Pastel 98", emoji: "💾", retro: true, hasDark: false },
    { id: "original", label: "Original", emoji: "🌙", retro: false, hasDark: true },
];

const DEFAULT_THEME = "win98";

const ThemeContext = createContext(null);

const read = (key, fallback) => {
    try {
        return localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
};

const write = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch {
        // storage unavailable — theme just won't persist
    }
};

export const ThemeProvider = ({ children }) => {
    // ?theme=win98&mode=light in the URL overrides the saved choice (handy for previews)
    const params = new URLSearchParams(window.location.search);
    const [themeId, setThemeId] = useState(() => {
        const stored = params.get("theme") ?? read("portfolio-theme", DEFAULT_THEME);
        return THEMES.some((t) => t.id === stored) ? stored : DEFAULT_THEME;
    });
    const [isDarkMode, setIsDarkMode] = useState(
        () => (params.get("mode") ?? read("theme", "dark")) !== "light"
    );

    const theme = THEMES.find((t) => t.id === themeId);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = themeId;
        root.dataset.retro = String(theme.retro);
        write("portfolio-theme", themeId);
    }, [themeId, theme.retro]);

    // once someone picks a theme in the UI, drop the ?theme= preview param so a reload keeps their choice
    const setTheme = (id) => {
        setThemeId(id);
        const url = new URL(window.location.href);
        if (url.searchParams.has("theme") || url.searchParams.has("mode")) {
            url.searchParams.delete("theme");
            url.searchParams.delete("mode");
            window.history.replaceState(null, "", url);
        }
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        write("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    const value = {
        theme,
        setTheme,
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((d) => !d),
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
