import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

// "/projects/foo.mp4" -> "/projects/foo-poster.jpg" (generated from the video's first seconds)
const posterFor = (video) => video.replace(/\.[^.]+$/, "-poster.jpg");

/*
 * Project video that never shows a blank box: the poster frame is visible right away,
 * the video plays over it once it has loaded, and if autoplay is blocked
 * (slow network, iPhone Low Power Mode, data saver) a play button lets people start it.
 */
export const ProjectMedia = ({ project, className }) => {
    const ref = useRef(null);
    const [blocked, setBlocked] = useState(false);

    if (!project.video) {
        return <img src={project.image} alt={project.title} loading="lazy" className={className} />;
    }

    const play = () => {
        const v = ref.current;
        if (!v) return;
        v.play().then(() => setBlocked(false), () => setBlocked(true));
    };

    return (
        <div className="relative w-full h-full">
            <video
                ref={ref}
                src={project.video}
                poster={posterFor(project.video)}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                onLoadedMetadata={(e) => {
                    e.target.playbackRate = 1.5;
                    play();
                }}
                onPlaying={() => setBlocked(false)}
                onClick={() => blocked && play()}
                className={className}
            />
            {blocked && (
                <button
                    onClick={play}
                    className="media-play absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/55 text-white flex items-center justify-center"
                    aria-label={`Play ${project.title} video`}
                >
                    <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                </button>
            )}
        </div>
    );
};
