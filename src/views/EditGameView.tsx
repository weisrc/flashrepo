import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { UpdateProgramButton } from "@/components/UpdateProgramButton";
import {
  deleteGame,
  GameMetadata,
  getGameMetadata,
  WithTags,
  withTags,
  writeGameMetadata,
} from "@/lib/repo";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import { UpdateScreenshotButton } from "@/components/UpdateScreenshotButton";
import { TagSelect } from "@/components/TagSelect";
import { toast } from "sonner";
import { GameScreenshot } from "@/components/GameScreenshot";
import { Container } from "@/components/Container";
import { PlayButton } from "@/components/PlayButton";
import { LoadingView } from "./LoadingView";

export function EditGameView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<WithTags<GameMetadata>>();

  useState(() => {
    getGameMetadata(id!)
      .then((m) => withTags([m]))
      .then(([m]) => setGame(m));
  });

  async function onSaveMetadata() {
    await writeGameMetadata({
      ...game!,
      tag_ids: game!.tags.map((t) => t.id),
    });

    toast.success("Metadata saved successfully");
  }

  async function onDeleteGame() {
    deleteGame(game!.id);
    toast.success("Game has been deleted");
    navigate("/");
  }

  if (!game) {
    return <LoadingView />;
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4">
        <BackButton to={`/game/${game.id}`} />
        <PlayButton game={game} />
      </div>

      <Label>Title</Label>

      <Input
        value={game.title}
        onChange={(e) => setGame({ ...game, title: e.target.value })}
        placeholder="Write the game title here..."
      />

      <Label>Description</Label>

      <Textarea
        value={game.description}
        onChange={(e) =>
          setGame({
            ...game,
            description: e.target.value,
          })
        }
        rows={14}
        placeholder="Write the description here..."
        className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
      />

      <Label>Tags</Label>

      <TagSelect
        placeholder="Add tags"
        value={game.tags}
        onChange={(tags) => setGame({ ...game, tags })}
      />

      <Label>Actions</Label>

      <div className="flex items-center gap-2 flex-row">
        <Button onClick={onSaveMetadata}>
          <Save />
          Save Metadata
        </Button>

        <UpdateProgramButton gameId={game.id} />
        <UpdateScreenshotButton gameId={game.id} />
        <Button onClick={() => window.location.reload()}>
          <RefreshCw />
          Refresh Preview
        </Button>
      </div>

      <Label>Screenshot Preview</Label>

      <GameScreenshot gameId={game.id} />

      <Label>Danger Zone</Label>

      <Button variant="destructive" onClick={onDeleteGame}>
        Delete Game
      </Button>
    </Container>
  );
}
