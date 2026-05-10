import { BackButton } from "@/components/BackButton";
import { Container } from "@/components/Container";
import { TagList } from "@/components/TagList";
import { Button } from "@/components/ui/button";
import { listTags, Tag, writeTag } from "@/lib/repo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function TagsView() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    listTags().then(setTags);
  });

  async function createTag() {
    const id = crypto.randomUUID();
    await writeTag({ name: "New Tag", id, color: "#ff4da6" });
    navigate(`/tags/${id}/edit`);
  }

  return (
    <Container>
      <div className="flex justify-between">
        <BackButton />
        <Button onClick={createTag}>Create Tag</Button>
      </div>

      <TagList tags={tags} editable />
    </Container>
  );
}
