import { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { writeGameScreenshot } from "@/lib/repo";
import { Image } from "lucide-react";
import { toast } from "sonner";

type Props = {
  gameId: string;
  onUpdate: () => void;
};

export function UpdateScreenshotButton({ gameId, onUpdate }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".png")) return;

    try {
      const buffer = await file.arrayBuffer();
      await writeGameScreenshot(gameId, new Uint8Array(buffer));
      toast.success("Screenshot updated successfully");
      onUpdate?.();
    } finally {
      e.currentTarget.value = "";
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <Image />
        Update Screenshot
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".png"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
