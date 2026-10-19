// Little Win98-flavoured pixel icons (32×32 grid, crisp edges)
const Svg = ({ size = 32, children }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
        {children}
    </svg>
);

const K = "#000"; // outline

export const NotepadIcon = (p) => (
    <Svg {...p}>
        <rect x="7" y="4" width="19" height="25" fill={K} />
        <rect x="8" y="5" width="17" height="23" fill="#fff" />
        <rect x="8" y="5" width="17" height="4" fill="#4a6cd4" />
        {[12, 15, 18, 21, 24].map((y) => (
            <rect key={y} x="10" y={y} width={y === 24 ? 8 : 13} height="1" fill="#8a8a8a" />
        ))}
        {[9, 13, 17, 21].map((x) => (
            <rect key={x} x={x} y="3" width="2" height="4" fill="#606060" />
        ))}
    </Svg>
);

export const FolderIcon = (p) => (
    <Svg {...p}>
        <path d="M3 8h10l2 2h14v17H3z" fill={K} />
        <path d="M4 9h8.5l2 2H28v15H4z" fill="#f5d36b" />
        <path d="M4 13h24v13H4z" fill="#ffe38f" />
        <rect x="4" y="13" width="24" height="1" fill="#fff6c9" />
    </Svg>
);

export const ToolboxIcon = (p) => (
    <Svg {...p}>
        <path d="M11 6h10v6h-2V8h-6v4h-2z" fill="#555" />
        <rect x="3" y="11" width="26" height="17" fill={K} />
        <rect x="4" y="12" width="24" height="15" fill="#e0607e" />
        <rect x="4" y="12" width="24" height="3" fill="#f394aa" />
        <rect x="4" y="18" width="24" height="1" fill="#a33a55" />
        <rect x="14" y="17" width="4" height="4" fill="#ffd34d" />
        <rect x="14" y="17" width="4" height="4" fill="none" stroke={K} strokeWidth="1" />
    </Svg>
);

export const MailIcon = (p) => (
    <Svg {...p}>
        <rect x="3" y="8" width="26" height="18" fill={K} />
        <rect x="4" y="9" width="24" height="16" fill="#fff" />
        <path d="M4 9l12 9 12-9" fill="none" stroke="#4a6cd4" strokeWidth="2" />
        <rect x="21" y="3" width="8" height="8" fill="#ff8fc7" />
        <path d="M23 5h4v4h-4z" fill="#fff" opacity=".6" />
    </Svg>
);

export const ComputerIcon = (p) => (
    <Svg {...p}>
        <rect x="4" y="3" width="24" height="19" fill={K} />
        <rect x="5" y="4" width="22" height="17" fill="#d8d3c4" />
        <rect x="7" y="6" width="18" height="13" fill="#1c6fb8" />
        <rect x="8" y="7" width="7" height="4" fill="#79c0ff" />
        <rect x="12" y="22" width="8" height="2" fill="#8a8679" />
        <rect x="6" y="24" width="20" height="5" fill={K} />
        <rect x="7" y="25" width="18" height="3" fill="#d8d3c4" />
    </Svg>
);

export const GlobeIcon = (p) => (
    <Svg {...p}>
        <circle cx="16" cy="16" r="12" fill={K} />
        <circle cx="16" cy="16" r="11" fill="#3d8de0" />
        <path d="M9 10h6v4h-3v5H8zM18 8h5v5h3v6h-4v-4h-4zM14 21h5v5h-5z" fill="#6fcf6f" />
        <path d="M5 13c8-6 18-6 24 2" fill="none" stroke="#ffd34d" strokeWidth="2" />
    </Svg>
);

export const LinkedInIcon = (p) => (
    <Svg {...p}>
        <rect x="4" y="4" width="24" height="24" fill={K} />
        <rect x="5" y="5" width="22" height="22" fill="#0a66c2" />
        <rect x="6" y="6" width="20" height="2" fill="#3d8be0" />
        <rect x="9" y="10" width="4" height="3" fill="#fff" />
        <rect x="9" y="15" width="4" height="9" fill="#fff" />
        <rect x="15" y="15" width="4" height="9" fill="#fff" />
        <path d="M19 15h3l2 2v7h-4v-6h-1z" fill="#fff" />
    </Svg>
);

export const VideoFileIcon = (p) => (
    <Svg {...p}>
        <path d="M6 3h14l6 6v20H6z" fill={K} />
        <path d="M7 4h12v6h6v18H7z" fill="#fff" />
        <path d="M20 4l5 5h-5z" fill="#c9c9c9" />
        <rect x="9" y="13" width="14" height="11" fill="#222" />
        <path d="M14 16v5l4-2.5z" fill="#ff8fc7" />
    </Svg>
);

export const ImageFileIcon = (p) => (
    <Svg {...p}>
        <path d="M6 3h14l6 6v20H6z" fill={K} />
        <path d="M7 4h12v6h6v18H7z" fill="#fff" />
        <path d="M20 4l5 5h-5z" fill="#c9c9c9" />
        <rect x="9" y="13" width="14" height="11" fill="#9fd0ff" />
        <path d="M9 24l5-6 3 3 2-2 4 5z" fill="#4caf50" />
        <rect x="18" y="14" width="3" height="3" fill="#ffd34d" />
    </Svg>
);

export const WindowsFlag = ({ size = 64 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" shapeRendering="crispEdges" aria-hidden="true">
        {/* four wavy panes, drawn as pixel rows */}
        {[
            ["#ff6fa8", 2, 4], ["#7ed957", 21, 4],
            ["#5ab0ff", 2, 22], ["#ffd34d", 21, 22],
        ].map(([c, x, y]) =>
            [0, 1, 2, 3, 4].map((r) => (
                <rect key={`${c}${r}`} x={x + (r % 2)} y={y + r * 3} width="16" height="2.4" fill={c} />
            ))
        )}
    </svg>
);
