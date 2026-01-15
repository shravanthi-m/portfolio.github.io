import { ArrowUp } from "lucide-react";

export const Footer = () => {
    return (
        <footer>
            {" "}
            <a href="#nametitle" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"> <ArrowUp size={20} /> </a>
        </footer>
    );
};