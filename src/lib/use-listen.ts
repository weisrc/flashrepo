import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

export function useListen(name: string, fn: (data: any) => void) {
  let unlisten: () => void;

  async function setup() {
    unlisten = await listen(name, (event) => {
      fn(event.payload);
    });
  }

  useEffect(() => {
    setup();
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [name, fn]);
}
