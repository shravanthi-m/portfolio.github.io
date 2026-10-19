import { Briefcase, Code, User } from "lucide-react";

export const aboutBlurb =
    "I'm a Master's CS student at UMass Amherst working on fine-grained image captioning and RL-based inference optimization in collaboration with Adobe. My interests lie primarily in computer vision, reinforcement learning, and software development.";

export const experiences = [
    {
        role: "Graduate Teaching Assistant",
        org: "University of Massachusetts Amherst",
        icon: User,
        description:
            "Evaluated assignments and exams for a graduate-level Algorithms for Data Science course. Provided feedback to students to support their understanding of mathematical proofs, algorithmic analysis and theoretical foundations in data science.",
    },
    {
        role: "Research Intern",
        org: "Jindo Technologies",
        icon: Briefcase,
        description:
            "Implemented a baseline model for edge detection in canine ultrasound videos using PyTorch. Conducted a literature review on edge detection techniques and explored self-supervised approaches to address limited annotated data.",
    },
];

export const AboutMe = () => {
    return <section id="about" className="py-24 px-4 relative">
        {" "}
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    {/* <h3 className="text-2x font-semibold">about what i am- title</h3> */}
                    <p className="text-muted-foreground">
                        {/* the content- what you're passionate about what tech you know broadly */}
                        {aboutBlurb}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a href="#contact" className="cosmic-button">
                            {" "}
                            Get In touch
                        </a>
                        {/* <a href="" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                            {" "}
                            Download CV
                        </a> */}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {/* <div className="gradient-border p-6 card-hover">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Code className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">Web dev</h4>
                                <p className="text-muted-foreground">
                                    creating this this this small because you have a separate skills section
                                </p>
                            </div>
                        </div>
                    </div> */}
                    {experiences.map(({ role, org, icon: Icon, description }) => (
                        <div key={role} className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Icon className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">{role}</h4>
                                    <p className="text-sm italic text-muted-foreground mb-2">{org}</p>
                                    <p className="text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
};
