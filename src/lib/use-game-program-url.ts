import { useState, useEffect } from "react";
import { getGameProgramBlob } from "./repo";

export function useGameProgramUrl(gameId: string | undefined) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!gameId) return;

    getGameProgramBlob(gameId).then((blob) => {
      setUrl(URL.createObjectURL(blob));
    });

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  return url;
}
