import { useEffect } from "react";

export function useWatchdog(onTimeout: () => void, timeout: number) {
  let timeoutId: number;

  function reset() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onTimeout();
    }, timeout);
  }

  useEffect(() => {
    reset();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onTimeout, timeout]);

  return reset;
}
