import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { listTags, Tag } from "@/lib/repo";

export interface TagCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function TagCommandDialog({
  open,
  onOpenChange,
  selectedTags,
  onTagsChange,
}: TagCommandDialogProps) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setLoading(true);

    listTags()
      .then(setAllTags)
      .finally(() => setLoading(false));
  }, [open]);

  const handleTagToggle = (tag: Tag) => {
    onTagsChange(
      selectedTags.some((t) => t.id === tag.id)
        ? selectedTags.filter((t) => t.id !== tag.id)
        : [...selectedTags, tag],
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Select Tags"
      description="Search and select tags for this item."
    >
      <Command className="bg-popover">
        <CommandInput placeholder="Search tags..." />
        <CommandEmpty className="text-muted-foreground">
          {loading
            ? "Loading tags..."
            : allTags.length === 0
              ? "No tags available."
              : "No tags found."}
        </CommandEmpty>
        <CommandList>
          {allTags.length > 0 ? (
            <CommandGroup>
              {allTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.id}
                  onSelect={() => handleTagToggle(tag)}
                  className="cursor-pointer text-foreground hover:bg-muted"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.some((t) => t.id === tag.id)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
