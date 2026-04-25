import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
    // Languages
    {name: "Python", category: "Languages"},
    {name: "C", category: "Languages"},
    {name: "C++", category: "Languages"},
    {name: "SQL", category: "Languages"},
    {name: "HTML", category: "Languages"},
    {name: "CSS", category: "Languages"},
    {name: "JavaScript", category: "Languages"},
    {name: "Dart", category: "Languages"},
    {name: "R", category: "Languages"},
    
    // Frontend
    {name: "HTML", category: "Frontend"},
    {name: "CSS", category: "Frontend"},
    {name: "JavaScript", category: "Frontend"},
    {name: "Angular", category: "Frontend"},
    
    // Backend
    {name: "Node.js", category: "Backend"},
    {name: "Express.js", category: "Backend"},
    {name: "MongoDB", category: "Backend"},
    {name: "SQL", category: "Backend"},
    
    // ML/AI
    {name: "PyTorch", category: "ML"},
    {name: "TensorFlow", category: "ML"},
    {name: "Keras", category: "ML"},
    {name: "OpenCV", category: "ML"},
    {name: "Pandas", category: "ML"},
    {name: "NumPy", category: "ML"},
    {name: "Seaborn", category: "ML"},
    {name: "Scikit-learn", category: "ML"},
    {name: "Gradio", category: "ML"},
    {name: "HuggingFace", category: "ML"},
    {name: "Unsloth", category: "ML"},
    
    // DevOps
    {name: "Kubernetes", category: "DevOps"},
    {name: "Docker", category: "DevOps"},
    {name: "Linux", category: "DevOps"},
    {name: "Git", category: "DevOps"},
    {name: "AWS", category: "DevOps"},
    {name: "Spark", category: "DevOps"},
    
    // Robotics
    {name: "ROS", category: "Robotics"},
    {name: "Gazebo", category: "Robotics"},
];

const categories = ["All", "Frontend", "Backend", "ML", "DevOps", "Robotics"];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "All" || skill.category === activeCategory
    );
    
    // Remove duplicates by skill name
    const uniqueSkills = Array.from(
        new Map(filteredSkills.map(skill => [skill.name, skill])).values()
    );

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My<span className="text-primary"> Skills</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                            key={key} 
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                    {uniqueSkills.map((skill, key) => (
                        <span
                            key={key}
                            className="px-4 py-2 rounded-full bg-card border border-foreground/10 text-foreground hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md card-hover"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};
