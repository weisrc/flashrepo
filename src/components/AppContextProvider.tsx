import { setupRepo } from "@/lib/repo";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext<{
  isAdmin: boolean;
  repoPath: string;
}>({
  isAdmin: false,
  repoPath: "",
});

export function useAppContext() {
  const appContext = useContext(AppContext);

  return {
    isAdmin: appContext.isAdmin,
    toURL(path: string) {
      return convertFileSrc(`${appContext.repoPath}/${path}`);
    },
  };
}

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [repoPath, setRepoPath] = useState<string>("");

  useEffect(() => {
    invoke("is_admin").then((isAdmin) => setIsAdmin(!!isAdmin));
    appLocalDataDir().then(setRepoPath);
    setupRepo();
  }, []);

  return <AppContext value={{ isAdmin, repoPath: repoPath }}>{children}</AppContext>;
}
