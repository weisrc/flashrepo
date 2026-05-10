import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackButton({
  to = "/",
  children,
}: {
  to?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link to={to} className="flex gap-2 items-center">
      <ArrowLeft />
      {children || "Back"}
    </Link>
  );
}
