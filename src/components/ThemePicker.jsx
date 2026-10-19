import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEMES, useTheme } from "@/lib/theme";

export const ThemePicker = ({ placement = "down" }) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative theme-picker">
            <button
                onClick={() => setOpen((o) => !o)}
                className="theme-picker-btn p-2 rounded-full hover:bg-foreground/10 transition-colors flex items-center gap-1.5"
                aria-label="Choose theme"
                aria-expanded={open}
            >
                <Palette className="h-5 w-5 text-primary" />
                <span className="theme-picker-label text-sm">{theme.label}</span>
            </button>
            {open && (
                <div
                    className={cn(
                        "theme-menu absolute right-0 w-48 p-1.5 rounded-xl bg-card border border-border shadow-xl z-50 text-left",
                        placement === "up" ? "bottom-full mb-2" : "top-full mt-2"
                    )}
                >
                    {THEMES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                setTheme(t.id);
                                setOpen(false);
                            }}
                            className="theme-menu-item w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-primary/10 transition-colors"
                        >
                            <span>{t.emoji}</span>
                            <span className="flex-1 text-left">{t.label}</span>
                            {theme.id === t.id && <Check className="h-4 w-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
