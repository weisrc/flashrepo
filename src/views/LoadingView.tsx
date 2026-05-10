import { Gamepad2 } from "lucide-react";

export function LoadingView() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Gamepad2 className="w-16 h-16 animate-spin" />
    </div>
  );
}
