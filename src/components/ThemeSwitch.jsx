import { Monitor, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEMES, useTheme } from "@/lib/theme";

// One-click toggle between the two themes
export const ThemeSwitch = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const next = THEMES.find((t) => t.id !== theme.id);
    const Icon = next.retro ? Monitor : Sparkles;

    return (
        <button
            onClick={() => setTheme(next.id)}
            className={cn("theme-switch", className)}
            title={`Switch to ${next.label}`}
        >
            <Icon className="theme-switch-icon" />
            <span>{next.retro ? "Retro view" : "Modern view"}</span>
        </button>
    );
};
