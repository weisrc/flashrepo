import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { GameMetadata } from "@/lib/repo";

export function PlayButton({ game }: { game: GameMetadata }) {
  function onClick() {
    new WebviewWindow("player", {
      url: `/game/${game.id}/play`,
      title: game.title,
      width: 800,
      height: 600,
      resizable: false,
    });
  }

  return (
    <Button onClick={onClick}>
      <Play /> Play
    </Button>
  );
}
