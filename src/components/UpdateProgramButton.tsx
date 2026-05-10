import { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { writeGameProgram } from "@/lib/repo";
import { Gamepad2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  gameId: string;
};

export function UpdateProgramButton({ gameId }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".swf")) return;

    try {
      const buffer = await file.arrayBuffer();
      await writeGameProgram(gameId, new Uint8Array(buffer));
      toast.success("Program updated successfully");
    } finally {
      e.currentTarget.value = "";
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <Gamepad2 />
        Update Program
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".swf"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
