import { useState } from "react";
import { aboutBlurb, experiences } from "../AboutMe";
import { projects } from "../ProjectsSection";
import { skills, categories } from "../SkillsSection";
import { CONTACT } from "../ContactSection";
import { ExternalLink, Github } from "lucide-react";
import { FolderIcon } from "./icons";

const MenuBar = ({ items }) => (
    <div className="w-menubar">
        {items.map((m) => (
            <span key={m}>
                <u>{m[0]}</u>
                {m.slice(1)}
            </span>
        ))}
    </div>
);

const StatusBar = ({ children }) => <div className="w-statusbar">{children}</div>;

/* ---------- Notepad-style text windows ---------- */

export const WelcomeApp = ({ open }) => (
    <div className="w-app">
        <MenuBar items={["File", "Edit", "Search", "Help"]} />
        <div className="w-field w-notepad">
            <p className="w-notepad-big">Hi, I'm Shravanthi Murugesan.</p>
            <p>MS CS @ UMass Amherst</p>
            <p>robots · computer vision · reinforcement learning</p>
            <p>&nbsp;</p>
            <p>Click an icon on the desktop to open it, or try:</p>
            <p>
                → <button className="w-link" onClick={() => open("projects")}>My Projects</button>
            </p>
            <p>
                → <button className="w-link" onClick={() => open("about")}>About_Me.txt</button>
            </p>
            <p>
                → <a className="w-link" href={`mailto:${CONTACT.email}`}>say hi</a>
                <span className="w-caret">|</span>
            </p>
        </div>
    </div>
);

export const AboutApp = () => (
    <div className="w-app">
        <MenuBar items={["File", "Edit", "Search", "Help"]} />
        <div className="w-field w-notepad">
            <p className="w-notepad-big">ABOUT_ME.TXT</p>
            <p>{aboutBlurb}</p>
            <p>&nbsp;</p>
            <p className="w-notepad-big">EXPERIENCE</p>
            {experiences.map((e) => (
                <div key={e.role} className="mb-4">
                    <p>* {e.role}</p>
                    <p className="opacity-70">  {e.org}</p>
                    <p>{e.description}</p>
                </div>
            ))}
        </div>
    </div>
);

/* ---------- Projects: scrollable gallery, like the main site ---------- */

const ProjectCard = ({ p }) => (
    <article className="w-project">
        <div className="w-field w-project-media">
            {p.video ? (
                <video
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    onLoadedMetadata={(e) => (e.target.playbackRate = 1.5)}
                />
            ) : (
                <img src={p.image} alt={p.title} loading="lazy" />
            )}
        </div>
        <div className="w-project-body">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="w-tags">
                {p.tags.map((t) => (
                    <span key={t} className="w-tag">{t}</span>
                ))}
            </div>
            {(p.link || p.demo) && (
                <div className="w-project-links">
                    {p.link && (
                        <a className="w-btn" href={p.link} target="_blank" rel="noopener noreferrer">
                            <Github size={13} /> GitHub
                        </a>
                    )}
                    {p.demo && (
                        <a className="w-btn" href={p.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={13} /> {p.demoLabel ?? "Live Demo"}
                        </a>
                    )}
                </div>
            )}
        </div>
    </article>
);

export const ProjectsApp = () => (
    <div className="w-app">
        <MenuBar items={["File", "Edit", "View", "Go", "Favorites", "Help"]} />
        <div className="w-addressbar">
            <span>Address</span>
            <div className="w-field w-address">
                <FolderIcon size={16} /> C:\My Projects
            </div>
        </div>
        <div className="w-field w-projects">
            {projects.map((p) => (
                <ProjectCard key={p.id} p={p} />
            ))}
            <a className="w-btn w-projects-more" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                See more on my GitHub…
            </a>
        </div>
        <StatusBar>
            <span>{projects.length} object(s)</span>
            <span>My Computer</span>
        </StatusBar>
    </div>
);

/* ---------- Control panel style skills ---------- */

export const SkillsApp = ({ close }) => {
    const [tab, setTab] = useState("All");
    const list = Array.from(
        new Map(
            skills.filter((s) => tab === "All" || s.category === tab).map((s) => [s.name, s])
        ).values()
    );
    return (
        <div className="w-app w-pad">
            <div className="w-tabs" role="tablist">
                {categories.map((c) => (
                    <button
                        key={c}
                        role="tab"
                        aria-selected={tab === c}
                        className={`w-tab ${tab === c ? "active" : ""}`}
                        onClick={() => setTab(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <div className="w-tabpanel">
                <fieldset className="w-groupbox">
                    <legend>{tab === "All" ? "Installed skills" : tab}</legend>
                    <div className="w-field w-listbox">
                        {list.map((s) => (
                            <span key={s.name} className="w-list-item">
                                <i /> {s.name}
                            </span>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className="w-actions">
                <button className="w-btn" onClick={close}>OK</button>
                <button className="w-btn" onClick={close}>Cancel</button>
                <button className="w-btn" disabled>Apply</button>
            </div>
        </div>
    );
};

export const RecycleBinApp = () => (
    <div className="w-app">
        <MenuBar items={["File", "Edit", "View", "Help"]} />
        <div className="w-field w-empty">This folder is empty.</div>
        <StatusBar>
            <span>0 object(s)</span>
            <span>0 regrets</span>
        </StatusBar>
    </div>
);
