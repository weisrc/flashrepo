import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteTag, getTag, listGameMetadata, Tag, writeTag } from "@/lib/repo";
import { BackButton } from "@/components/BackButton";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { LoadingView } from "./LoadingView";

export function EditTagView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tag, setTag] = useState<Tag>();

  useEffect(() => {
    getTag(id!).then(setTag);
  }, []);

  if (!tag) {
    return <LoadingView />;
  }

  async function onSave() {
    await writeTag(tag!);
    toast.success("Tag saved successfully");
  }

  async function onDelete() {
    if (!tag) {
      return;
    }

    for (const game of await listGameMetadata()) {
      if (game.tag_ids.includes(tag.id)) {
        toast.error(
          `Cannot delete tag because it's still used by game "${game.title}"`,
        );
        return;
      }
    }

    await deleteTag(tag!.id);
    toast.success("Tag has been deleted");
    navigate("/tags");
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4">
        <BackButton to={`/tags`} />
      </div>

      <Label>Name</Label>

      <Input
        value={tag.name}
        onChange={(e) => setTag({ ...tag, name: e.target.value })}
        placeholder="Write the tag name here..."
      />

      <Label>Color</Label>

      <Input
        type="color"
        value={tag.color}
        onChange={(e) => {
          setTag({ ...tag, color: e.target.value });
        }}
        className="border border-border bg-muted p-0 h-10 w-20"
      />

      <Label>Actions</Label>

      <Button onClick={onSave}>
        <Save />
        Save
      </Button>

      <Label>Danger Zone</Label>

      <Button variant="destructive" onClick={onDelete}>
        Delete Tag
      </Button>

      <p>Make sure no other games are using this tag before deleting.</p>
    </Container>
  );
}
