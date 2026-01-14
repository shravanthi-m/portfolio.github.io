import { NavBar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { NameTitle } from "../components/NameTitle";
import { AboutMe } from "../components/AboutMe";
import { SkillsSection } from "../components/SkillsSection";

export const Home = () => {
  return (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden"> 
    {/* Theme toggle */}
    {/* <ThemeToggle /> */}

    {/* Backgorund Effects*/}

    {/* NavBar */}
    <NavBar />

    {/* Main Content */}
    <main>
        <NameTitle />
        <AboutMe />
        <SkillsSection />
    </main>
    
    {/* Footer */}
  </div>
  );
};