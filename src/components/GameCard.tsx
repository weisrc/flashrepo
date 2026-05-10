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

type Props = {
  value: WithTags<GameMetadata>;
};

export function GameCard({ value }: Props) {
  return (
    <Link
      to={`/game/${value.id}`}
      className="group block overflow-hidden text-left transition duration-200 hover:-translate-y-1"
    >
      <Card className="overflow-hidden border-border bg-card group-hover:border-border/80 group-hover:bg-card/90">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <GameScreenshot gameId={value.id} />
          <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/20 to-transparent" />
        </div>

        <CardHeader className="space-y-2 px-4 py-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            {value.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {value.description || "No description provided."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            <TagList tags={value.tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
