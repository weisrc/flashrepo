import { Gamepad2 } from "lucide-react";
import { useGameScreenshotUrl } from "@/lib/use-game-screenshot-url";

export function GameScreenshot({ gameId }: { gameId: string }) {
  const url = useGameScreenshotUrl(gameId);

  if (!url) {
    return (
      <div className="w-full aspect-4/3 flex items-center justify-center">
        <Gamepad2 className="w-16 h-16" />
      </div>
    );
  }

  return <img src={url} className="w-full aspect-4/3 object-cover" />;
}
