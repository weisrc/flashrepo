import { useEffect, useState, useMemo } from "react";
import { GameCard } from "@/components/GameCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  GameMetadata,
  listGameMetadata,
  Tag,
  withTags,
  WithTags,
} from "@/lib/repo";
import { AddGameButton } from "@/components/AddGameButton";
import { TagSelect } from "@/components/TagSelect";
import { Container } from "@/components/Container";
import { useAppContext } from "@/components/AppContextProvider";
import { Label } from "@/components/ui/label";

export function HomeView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [games, setGames] = useState<WithTags<GameMetadata>[]>([]);

  const { isAdmin } = useAppContext();

  useEffect(() => {
    listGameMetadata().then(withTags).then(setGames);
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const queryLower = searchQuery.toLowerCase();

      const matchesQuery =
        game.title.toLowerCase().includes(queryLower) ||
        game.description.toLowerCase().includes(queryLower);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => game.tag_ids.includes(tag.id));

      return matchesQuery && matchesTags;
    });
  }, [games, searchQuery, selectedTags]);

  return (
    <Container>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 border-border bg-muted text-foreground placeholder:text-muted-foreground"
          />

          <TagSelect
            placeholder="Filter by tags"
            value={selectedTags}
            onChange={(tags) => setSelectedTags(tags)}
          />
        </div>
      </nav>

      {isAdmin && (
        <>
          <Label>Admin Actions</Label>
          <div className="flex gap-2">
            <AddGameButton />
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link to="/tags">View Tags</Link>
            </Button>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredGames.map((g) => (
          <GameCard key={g.id} value={g} />
        ))}
      </div>
    </Container>
  );
}
