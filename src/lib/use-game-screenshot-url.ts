import { useState, useEffect } from "react";
import { getGameScreenshotBlob } from "./repo";

export function useGameScreenshotUrl(gameId: string | undefined) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!gameId) return;

    getGameScreenshotBlob(gameId)
      .then((blob) => {
        setUrl(URL.createObjectURL(blob));
      })
      .catch(() => {});

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  return url;
}
