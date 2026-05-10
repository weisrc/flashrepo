import { useEffect, useRef } from "react";

declare global {
  interface Window {
    RufflePlayer: {
      newest(): Ruffle;
      config: any;
    };
  }

  interface Ruffle {
    createPlayer(): Player;
  }
}

type Player = HTMLElement & {
  ruffle(): {
    load(url: string): void;
  };
};

window.RufflePlayer.config = {
  autoplay: "on",
  splashScreen: false,
  //   unmuteOverlay: "hidden",
};
const ruffle = window.RufflePlayer.newest();

export function RufflePlayer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  let player: Player | null = null;

  useEffect(() => {
    if (!containerRef.current) return;

    player = ruffle.createPlayer();
    player.style.height = window.innerHeight + "px";
    player.style.width = window.innerWidth + "px";
    containerRef.current.appendChild(player);

    return () => {
      if (!player) return;
      containerRef.current?.removeChild(player);
    };
  }, []);

  useEffect(() => {
    if (!player) return;
    player.ruffle().load(url);
  }, [url]);

  return <div ref={containerRef} className="w-full h-96"></div>;
}
