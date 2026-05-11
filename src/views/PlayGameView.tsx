import { RufflePlayer } from "@/components/RufflePlayer";
import { useParams } from "react-router-dom";
import { LoadingView } from "./LoadingView";
import { useGameProgramUrl } from "@/lib/use-game-program-url";

export function PlayGameView() {
  const { id } = useParams();
  const url = useGameProgramUrl(id);

  if (!url) {
    return <LoadingView />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <RufflePlayer url={url} />;
    </div>
  );
}
