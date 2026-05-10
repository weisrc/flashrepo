import { writeGameMetadata, writeGameProgram } from "@/lib/repo";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function AddGameButton() {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileSelect = useCallback(async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const program = new Uint8Array(await file.arrayBuffer());
    const id = crypto.randomUUID();
    await writeGameMetadata({
      id,
      title: file.name.replace(/\.swf$/i, ""),
      description: "",
      tag_ids: [],
      rating: 1,
    });

    await writeGameProgram(id, program);

    navigate(`/game/${id}/edit`);
  }, []);

  return (
    <Button onClick={() => fileInputRef.current?.click()}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".swf"
        className="hidden"
        onChange={(e) => {
          onFileSelect(e.target.files);
          e.currentTarget.value = "";
        }}
      />
      Add Game
    </Button>
  );
}
