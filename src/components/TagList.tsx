import { Tag } from "@/lib/repo";
import { TagBadge } from "./TagBadge";

export function TagList({
  tags,
  editable,
}: {
  tags: Tag[];
  editable?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagBadge key={tag.id} value={tag} editable={editable} />
      ))}
    </div>
  );
}
