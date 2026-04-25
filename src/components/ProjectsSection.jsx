import { ExternalLink, Github } from "lucide-react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Meal Planner",
    description: "A full-stack web app for building weekly meal plans. Integrates the Spoonacular and Fat Secret APIs for recipe data, with server-side caching, secure user authentication, dynamic shopping list generation, and a responsive UI. Built with React, Node.js, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    link: "https://github.com/YOUR_USERNAME/meal-planner",
    // demo: ""   ← no live demo
  },
  {
    id: 2,
    title: "Autonomous Object Sorter",
    description: "A mobile robot that perceives, reasons, and sorts objects in real time. Uses YOLO for object detection, RGB-D sensing for depth, and TF-based odometry for navigation. Built a full perception-to-action loop with proportional control and goal-directed bin navigation in ROS.",
    video: "/projects/object-sorter-demo.mp4",  // Video instead of image
    tags: ["ROS", "YOLO", "Python", "Computer Vision", "Robotics"],
    link: "https://github.com/YOUR_USERNAME/object-sorter",
    // demo: ""   ← use video embed instead
  },
  {
    id: 3,
    title: "Epilepsy Detection from EEG Signals",
    description: "Deep learning model for seizure detection and epileptogenic zone localization from raw EEG signals. Explored non-linear representations (recurrence plots, reconstructed phase space) and trained attention-based architectures — achieving 94.99% precision for detection and 87.5% accuracy for localization. Published at IEEE ICCDS 2025.",
    tags: ["TensorFlow", "Keras", "Deep Learning", "Signal Processing"],
    link: "https://ieeexplore.ieee.org/YOUR_DOI_HERE",
    // demo: ""
  },
  {
    id: 4,
    title: "Product Attribute Prediction",
    description: "ML pipeline over a 2.2M-record Amazon dataset. Built end-to-end: data cleaning, text preprocessing, feature engineering, and model evaluation across regression and tree-based approaches. Most of the gains came from data work, not model choice — ~94% validation accuracy.",
    tags: ["Python", "Scikit-learn", "Pandas", "Feature Engineering"],
    link: "https://github.com/YOUR_USERNAME/amazon-ml-challenge",
    // demo: ""
  },
  {
    id: 5,
    title: "Fine-Grained Image Captioning · Adobe Research",
    description: "Research project on improving the factual accuracy of vision-language model captions at the attribute level. Extending a multi-agent LLM verification pipeline and integrating GRPO-based reinforcement learning to replace multi-pass verification with a single-pass approach — reducing latency while maintaining descriptive accuracy.",
    tags: ["PyTorch", "Reinforcement Learning", "Computer Vision", "LLMs"],
    // link: ""   ← no public repo
    // demo: ""
  },
];

// add project screenshots/videos to projects folder inside public folder

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    {" "}
                    Featured <span className="text-primary"> Projects </span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Here are some of my recent projects. Each project was carefully 
                    crafted with attention to detail, performance, and user experience.
                    {/* redo this */}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
                            <div className="h-48 overflow-hidden bg-secondary/30">
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        webkit-playsinline="true"
                                        onLoadedMetadata={(e) => e.target.playbackRate = 1.5}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        No media
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs font-medium border border-foreground/10 rounded-full bg-secondary text-secondary-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            
                                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                                <ExternalLink size={20}/> 
                                            </a>
                                        )}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                                                <Github size={20}/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <a 
                        className="cosmic-button w-fit flex items-center mx-auto gap-2" 
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/shravanthi-m"
                    >
                        Check My Github <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};
