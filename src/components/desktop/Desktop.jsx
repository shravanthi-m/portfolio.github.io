import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/lib/theme";
import { CONTACT } from "../ContactSection";
import { ThemeSwitch } from "../ThemeSwitch";
import {
    NotepadIcon, FolderIcon, ToolboxIcon, MailIcon, GlobeIcon, LinkedInIcon,
    WindowsFlag,
} from "./icons";
import {
    WelcomeApp, AboutApp, ProjectsApp, SkillsApp, EmailApp,
} from "./apps";

/* ---------- what can be opened ---------- */

const APPS = {
    welcome: { title: "Welcome.txt - Notepad", Icon: NotepadIcon, w: 480, h: 340, App: WelcomeApp },
    about: { title: "About_Me.txt - Notepad", Icon: NotepadIcon, w: 560, h: 460, App: AboutApp },
    projects: { title: "C:\\My Projects", Icon: FolderIcon, w: 900, h: 620, App: ProjectsApp },
    skills: { title: "Skills Properties", Icon: ToolboxIcon, w: 540, h: 430, App: SkillsApp },
    email: { title: "Email Me", Icon: MailIcon, w: 440, h: 230, App: EmailApp, dialog: true },
};

const appFor = (key) => APPS[key];

const openLink = (href) => window.open(href, "_blank", "noopener,noreferrer");

const DESKTOP_ICONS = [
    { key: "welcome", label: "Welcome.txt", Icon: NotepadIcon },
    { key: "about", label: "About_Me.txt", Icon: NotepadIcon },
    { key: "projects", label: "My Projects", Icon: FolderIcon },
    { key: "skills", label: "Skills.exe", Icon: ToolboxIcon },
    { key: "email", label: "Email Me", Icon: MailIcon },
    { key: "github", label: "GitHub", Icon: GlobeIcon, href: CONTACT.github },
    { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, href: CONTACT.linkedin },
];

/* ---------- decorations ---------- */

const DesktopLogo = () => (
    <div className="desk-logo" aria-hidden="true">
        <WindowsFlag size={86} />
        <div>
            <div className="desk-logo-small">Shravanthi</div>
            <div className="desk-logo-big">
                Murugesan
            </div>
            <div className="desk-logo-tag">Portfolio Edition</div>
        </div>
    </div>
);

/* ---------- window ---------- */

const Window = ({ win, active, onFocus, onClose, onMinimize, onMaximize, onMove, open }) => {
    const { title, Icon, App } = appFor(win.key);
    const drag = useRef(null);

    const onPointerDown = (e) => {
        if (e.target.closest("button") || win.max) return;
        drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e) => {
        if (!drag.current) return;
        onMove(win.key, e.clientX - drag.current.dx, Math.max(0, e.clientY - drag.current.dy));
    };
    const onPointerUp = () => (drag.current = null);

    return (
        <div
            className={`win ${active ? "active" : "inactive"} ${win.max ? "maximized" : ""}`}
            style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z, display: win.min ? "none" : undefined }}
            onPointerDown={() => onFocus(win.key)}
            role="dialog"
            aria-label={title}
        >
            <div
                className="win-titlebar"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onDoubleClick={() => onMaximize(win.key)}
            >
                <span className="win-title">
                    <Icon size={16} />
                    <span className="truncate">{title}</span>
                </span>
                <span className="win-controls">
                    <button className="win-btn" onClick={() => onMinimize(win.key)} aria-label="Minimize">
                        <svg width="8" height="7" viewBox="0 0 8 7"><rect x="1" y="5" width="6" height="2" fill="currentColor" /></svg>
                    </button>
                    <button className="win-btn" onClick={() => onMaximize(win.key)} aria-label="Maximize">
                        <svg width="9" height="9" viewBox="0 0 9 9"><path d="M0 0h9v9H0z M1 2v6h7V2z" fill="currentColor" fillRule="evenodd" /></svg>
                    </button>
                    <button className="win-btn win-btn-close" onClick={() => onClose(win.key)} aria-label="Close">
                        <svg width="8" height="7" viewBox="0 0 8 7"><path d="M0 0h2l2 2 2-2h2L5 3.5 8 7H6L4 5 2 7H0l3-3.5z" fill="currentColor" /></svg>
                    </button>
                </span>
            </div>
            <div className="win-body">
                <App {...win.props} open={open} close={() => onClose(win.key)} />
            </div>
        </div>
    );
};

/* ---------- taskbar ---------- */

const useClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 15000);
        return () => clearInterval(id);
    }, []);
    return now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const ShutdownScreen = ({ onClose }) =>
    createPortal(
        <div className="shutdown-screen" onClick={onClose}>
            <p>It's now safe to turn off</p>
            <p>your computer.</p>
            <p className="shutdown-hint">(or click anywhere to keep browsing)</p>
        </div>,
        document.body
    );

const Taskbar = ({ windows, activeKey, onTaskClick, open }) => {
    const { setTheme } = useTheme();
    const [startOpen, setStartOpen] = useState(false);
    const [shutdown, setShutdown] = useState(false);
    const time = useClock();
    const ref = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setStartOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const launch = (key) => {
        open(key);
        setStartOpen(false);
    };

    return (
        <div className="taskbar" ref={ref}>
            <button className={`start-btn ${startOpen ? "active" : ""}`} onClick={() => setStartOpen((o) => !o)}>
                <WindowsFlag size={18} />
                Start
            </button>

            <div className="taskbar-tasks">
                {windows.map((w) => {
                    const { title, Icon } = appFor(w.key);
                    return (
                        <button
                            key={w.key}
                            className={`taskbar-btn ${w.key === activeKey && !w.min ? "active" : ""}`}
                            onClick={() => onTaskClick(w.key)}
                            title={title}
                        >
                            <Icon size={16} />
                            <span className="truncate">{title}</span>
                        </button>
                    );
                })}
            </div>

            <ThemeSwitch className="taskbar-btn taskbar-switch" />

            <div className="tray">
                <span className="tray-clock">{time}</span>
            </div>

            {startOpen && (
                <div className="start-menu">
                    <div className="start-menu-banner">
                        <span>
                            Shravanthi
                        </span>
                    </div>
                    <div className="start-menu-items">
                        {DESKTOP_ICONS.map(({ key, label, Icon, href }) => (
                            <button
                                key={key}
                                onClick={() => (href ? (openLink(href), setStartOpen(false)) : launch(key))}
                                className="start-menu-item"
                            >
                                <Icon size={24} /> {label}
                            </button>
                        ))}
                        <hr className="start-menu-sep" />
                        <button
                            className="start-menu-item"
                            onClick={() => {
                                setTheme("original");
                                setStartOpen(false);
                            }}
                        >
                            <span className="text-xl">✨</span> Switch to Modern view
                        </button>
                        <hr className="start-menu-sep" />
                        <button
                            className="start-menu-item"
                            onClick={() => {
                                setShutdown(true);
                                setStartOpen(false);
                            }}
                        >
                            <span className="text-xl">🔌</span> Shut Down...
                        </button>
                    </div>
                </div>
            )}

            {shutdown && <ShutdownScreen onClose={() => setShutdown(false)} />}
        </div>
    );
};

/* ---------- desktop ---------- */

const isPhone = () => window.innerWidth < 640;

export const Desktop = () => {
    const [windows, setWindows] = useState([]);
    const [activeKey, setActiveKey] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const zTop = useRef(10);

    const focus = (key) => {
        zTop.current += 1;
        const z = zTop.current;
        setActiveKey(key);
        setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, z, min: false } : w)));
    };

    const open = (key, props = {}) => {
        setWindows((ws) => {
            if (ws.some((w) => w.key === key)) return ws;
            const { w, h, dialog } = appFor(key);
            const vw = window.innerWidth, vh = window.innerHeight - 40;
            const n = ws.length;
            const width = Math.min(w, vw - 24);
            const height = Math.min(h, vh - 24);
            return [
                ...ws,
                {
                    key,
                    props,
                    w: width,
                    h: height,
                    // start clear of the icon column + tip balloon
                    x: Math.max(8, Math.min(vw - width - 8, (vw > 760 ? 310 : 150) + n * 32)),
                    y: isPhone() && dialog ? (vh - height) / 3 : Math.max(8, Math.min(vh - height - 8, 40 + n * 28)),
                    z: zTop.current + 1,
                    min: false,
                    // small dialogs stay dialog-sized on phones; everything else fills the screen
                    max: isPhone() && !dialog,
                },
            ];
        });
        focus(key);
    };

    const close = (key) => setWindows((ws) => ws.filter((w) => w.key !== key));
    const minimize = (key) => {
        setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, min: true } : w)));
        setActiveKey(null);
    };
    const maximize = (key) => setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, max: !w.max } : w)));
    const move = (key, x, y) => setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, x, y } : w)));

    const onTaskClick = (key) => {
        const w = windows.find((x) => x.key === key);
        if (w && key === activeKey && !w.min) minimize(key);
        else focus(key);
    };

    useEffect(() => {
        // on phones windows open full screen, so leave the desktop visible and let the hint do the talking
        if (!isPhone()) open("welcome");
        const t = setTimeout(() => setShowHint(true), 900);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="desktop-shell">
            <div
                className="desktop"
                onPointerDown={(e) => {
                    if (e.target === e.currentTarget) setSelectedIcon(null);
                }}
            >
                <DesktopLogo />

                <div className="desk-icons">
                    {DESKTOP_ICONS.map(({ key, label, Icon, href }) => (
                        <button
                            key={key}
                            className={`desk-icon ${selectedIcon === key ? "selected" : ""}`}
                            onClick={() => {
                                setSelectedIcon(key);
                                setShowHint(false);
                                if (href) openLink(href);
                                else open(key);
                            }}
                        >
                            <span className="desk-icon-img">
                                <Icon size={36} />
                            </span>
                            <span className="desk-icon-label">{label}</span>
                        </button>
                    ))}
                </div>

                {showHint && (
                    <div className="desk-hint" role="status">
                        <button className="desk-hint-close" onClick={() => setShowHint(false)} aria-label="Dismiss tip">
                            ✕
                        </button>
                        <b>💡 Tip</b>
                        <p>Click an icon to open it: projects, about me, skills and more.</p>
                    </div>
                )}

                {windows.map((w) => (
                    <Window
                        key={w.key}
                        win={w}
                        active={w.key === activeKey}
                        onFocus={focus}
                        onClose={close}
                        onMinimize={minimize}
                        onMaximize={maximize}
                        onMove={move}
                        open={open}
                    />
                ))}
            </div>
            <Taskbar windows={windows} activeKey={activeKey} onTaskClick={onTaskClick} open={open} />
        </div>
    );
};
