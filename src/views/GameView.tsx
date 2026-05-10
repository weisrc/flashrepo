import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import { GameMetadata, getGameMetadata, withTags, WithTags } from "@/lib/repo";
import { TagList } from "@/components/TagList";
import { Container } from "@/components/Container";
import { BackButton } from "@/components/BackButton";
import { useAppContext } from "@/components/AppContextProvider";
import { GameScreenshot } from "@/components/GameScreenshot";
import { PlayButton } from "@/components/PlayButton";
import { LoadingView } from "./LoadingView";
import { Rating } from "@/components/Rating";

export function GameView() {
  const { id } = useParams();

  const { isAdmin } = useAppContext();

  const [game, setGame] = useState<WithTags<GameMetadata>>();

  useEffect(() => {
    getGameMetadata(id!)
      .then((m) => withTags([m]))
      .then(([m]) => setGame(m));
  });

  if (!game) {
    return <LoadingView />;
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4">
        <BackButton />

        <div className="flex gap-4 items-center">
          {isAdmin && (
            <Link to={`/game/${game.id}/edit`} className="flex gap-2">
              <Edit /> Edit
            </Link>
          )}

          <PlayButton game={game} />
        </div>
      </div>

      <h1 className="text-4xl">{game.title}</h1>

      <Rating value={game.rating} />

      <p>{game.description}</p>

      <TagList tags={game.tags} />

      <GameScreenshot gameId={game.id} />
    </Container>
  );
}
