import { RufflePlayer } from "@/components/RufflePlayer";
import { getGameProgramBlob } from "@/lib/repo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingView } from "./LoadingView";

export function PlayGameView() {
  const { id } = useParams();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (!id) return;

    getGameProgramBlob(id!).then((blob) => {
      setUrl(URL.createObjectURL(blob));
    });

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  if (!url) {
    return <LoadingView />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <RufflePlayer url={url} />;
    </div>
  );
}
