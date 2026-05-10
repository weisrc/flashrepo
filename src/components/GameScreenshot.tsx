import { getGameScreenshotPath } from "@/lib/repo";
import { useAppContext } from "./AppContextProvider";
import { useState } from "react";
import { Gamepad2 } from "lucide-react";

export function GameScreenshot({ gameId }: { gameId: string }) {
  const { toURL } = useAppContext();
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full aspect-4/3 flex items-center justify-center">
        <Gamepad2 className="w-16 h-16"/>
      </div>
    );
  }

  return (
    <img
      src={toURL(getGameScreenshotPath(gameId))}
      className="w-full aspect-4/3 object-cover"
      onError={() => setError(true)}
    />
  );
}
