import { RufflePlayer } from "@/components/RufflePlayer";
import { writeGameScreenshot } from "@/lib/repo";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { LoadingView } from "./LoadingView";
import { useAppContext } from "@/components/AppContextProvider";
import { useListen } from "@/lib/use-listen";
import { useGameProgramUrl } from "@/lib/use-game-program-url";
import { emitTo } from "@tauri-apps/api/event";

export function PlayGameView() {
  const { id } = useParams();
  const url = useGameProgramUrl(id);

  let containerRef = useRef<HTMLDivElement>(null);

  const { isAdmin } = useAppContext();

  async function updateScreenshot(targetId: string) {
    if (!containerRef.current || !id || !isAdmin || targetId != id) return;

    const canvas = containerRef.current
      .querySelector("ruffle-player")
      ?.shadowRoot?.querySelector("canvas") as HTMLCanvasElement | null;

    if (!canvas) return;

    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const dataURL = canvas.toDataURL("image/png");

      if (dataURL.length < 50_000) {
        // retry if the image is transparent
        continue;
      }

      const base64String = dataURL.split(",")[1];
      const binaryString = atob(base64String);
      const buffer = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }

      await writeGameScreenshot(id, new Uint8Array(buffer));
      await emitTo("main", "screenshot-response", true);
      return;
    }
  }

  useListen("screenshot-request", updateScreenshot);

  if (!url) {
    return <LoadingView />;
  }

  return (
    <div className="w-full h-screen overflow-hidden" ref={containerRef}>
      <RufflePlayer url={url} />;
    </div>
  );
}
