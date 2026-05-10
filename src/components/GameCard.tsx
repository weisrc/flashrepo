import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WithTags, GameMetadata } from "@/lib/repo";
import { TagList } from "./TagList";
import { GameScreenshot } from "./GameScreenshot";
import { Rating } from "./Rating";

type Props = {
  value: WithTags<GameMetadata>;
};

export function GameCard({ value }: Props) {
  return (
    <Link to={`/game/${value.id}`}>
      <Card>
        <GameScreenshot gameId={value.id} />

        <CardHeader>
          <CardTitle>{value.title}</CardTitle>
          <Rating value={value.rating} />
          <CardDescription>{value.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <TagList tags={value.tags} />
        </CardContent>
      </Card>
    </Link>
  );
}
