import { Tag } from "@/lib/repo";
import { TagCommandDialog } from "./TagCommandDialog";
import { useState } from "react";
import { TagList } from "./TagList";
import { TagBadge } from "./TagBadge";

export function TagSelect({
  value,
  onChange,
  placeholder,
}: {
  value: Tag[];
  placeholder: string;
  onChange: (value: Tag[]) => void;
}) {
  const [tagDialogOpen, setTagDialogOpen] = useState(false);

  return (
    <>
      <div
        className="inline-block cursor-pointer"
        onClick={() => setTagDialogOpen(true)}
      >
        {value.length === 0 ? (
          <TagBadge value={{ id: "none", name: placeholder, color: "gray" }} />
        ) : (
          <TagList tags={value} />
        )}
      </div>

      <TagCommandDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        selectedTags={value}
        onTagsChange={(value) => onChange(value)}
      />
    </>
  );
}
