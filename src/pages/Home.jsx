import { NavBar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { NameTitle } from "../components/NameTitle";
import { AboutMe } from "../components/AboutMe";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Desktop } from "../components/desktop/Desktop";
import { useTheme } from "../lib/theme";

export const Home = () => {
  const { theme } = useTheme();

  // retro themes are a whole desktop instead of a scrolling page
  if (theme.retro) return <Desktop />;

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
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
    </main>
    
    {/* Footer */}
    {/* <Footer /> */}
  </div>
  );
};