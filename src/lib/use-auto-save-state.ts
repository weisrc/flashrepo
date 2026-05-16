import { useRef, useState } from "react";
import { useWatchdog } from "./use-watchdog";

export function useAutoSaveState<T>(
  saveFn: () => void,
  ...args: Parameters<typeof useState<T>>
) {
  const [state, setStateRaw] = useState<T>(...args);
  const isDirty = useRef(false);

  function trySave() {
    if (isDirty.current) {
      saveFn();
      isDirty.current = false;
    }
  }

  const reset = useWatchdog(trySave, 1000);

  function setState(...args: Parameters<typeof setStateRaw>) {
    setStateRaw(...args);
    isDirty.current = true;
    reset();
  }

  return [state, setState, setStateRaw] as const;
}
