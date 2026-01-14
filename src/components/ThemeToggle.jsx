import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return (
        <div className="fixed top-5 right-5 z-50 group">
            <button 
                onClick={toggleTheme}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={cn(
                    "p-3 rounded-full transition-all duration-300",
                    "bg-background/80 backdrop-blur-md",
                    "border border-foreground/10",
                    "hover:border-primary/50 hover:shadow-lg hover:scale-110",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "max-sm:hidden"
                )}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-180"/>
                ) : (
                    <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:-rotate-12"/>
                )}
            </button>
            
            {/* Tooltip */}
            <div className={cn(
                "absolute top-full right-0 mt-2 px-3 py-1.5 rounded-md",
                "bg-foreground text-background text-sm font-medium whitespace-nowrap",
                "transition-all duration-200 pointer-events-none",
                showTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            )}>
                {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-foreground rotate-45" />
            </div>
        </div>
    );
};