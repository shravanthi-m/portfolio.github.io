import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    {name: "Home", href: "#nametitle"},
    {name: "About", href: "#about"},
    {name: "Skills", href: "#skills"},
    {name: "Projects", href: "#projects"},
    {name: "Contact", href: "#contact"},
]

export const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        
        // Load theme from localStorage
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return ( 
    <nav className={cn("fixed w-full z-40 transition-all duration-300", 
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
    )}
    >
        <div className="container flex items-center justify-between">
            <a className="text-xl font-bold text-primary flex items-center" href="#nametitle">
                <span className="relative z-10">
                    <span className="text-glow text-foreground">Shravanthi Murugesan</span> Portfolio
                </span>
            </a>
            
            {/* Desktop Nav Items + Theme Toggle */}
            <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, key) => (
                    <a 
                        key={key} 
                        href={item.href} 
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                        {item.name}
                    </a>
                ))}
                
                {/* Theme Toggle Button */}
                <div className="relative group">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            "hover:bg-foreground/10"
                        )}
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-180"/>
                        ) : (
                            <Moon className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:-rotate-12"/>
                        )}
                    </button>
                    {/* Custom Tooltip */}
                    <div className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-foreground rotate-45" />
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden p-2 text-foreground z-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            > 
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />} 
            </button>
            
            {/* Mobile Menu */}
            <div className={cn(
                    "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "transition-all duration-300 md:hidden",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col space-y-8 text-xl">
                    {navItems.map((item, key) => (
                        <a 
                            key={key} 
                            href={item.href} 
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    
                    {/* Theme Toggle in Mobile Menu */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                        {isDarkMode ? (
                            <>
                                <Sun className="h-5 w-5 text-yellow-400"/> Light Mode
                            </>
                        ) : (
                            <>
                                <Moon className="h-5 w-5 text-blue-600"/> Dark Mode
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </nav>
    );
};