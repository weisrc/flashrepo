import { setupRepo } from "@/lib/repo";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appDataDir } from "@tauri-apps/api/path";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext<{
  isAdmin: boolean;
  appDataPath: string;
}>({
  isAdmin: false,
  appDataPath: "",
});

export function useAppContext() {
  const appContext = useContext(AppContext);

  return {
    isAdmin: appContext.isAdmin,
    toURL(path: string) {
      return convertFileSrc(`${appContext.appDataPath}/${path}`);
    },
  };
}

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [appDataPath, setAppDataPath] = useState<string>("");

  useEffect(() => {
    invoke("is_admin").then((isAdmin) => setIsAdmin(!!isAdmin));
    appDataDir().then(setAppDataPath);
    setupRepo();
  }, []);

  return <AppContext value={{ isAdmin, appDataPath }}>{children}</AppContext>;
}
