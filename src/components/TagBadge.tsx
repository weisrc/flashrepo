import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/lib/repo";

export interface TagProps {
  value: Tag;
  editable?: boolean;
}

export function TagBadge({ value, editable }: TagProps) {
  const navigate = useNavigate();

  const handleClick = (_e: React.MouseEvent) => {
    navigate(`/tags/${value.id}/edit`);
  };

  return (
    <Badge
      className="cursor-pointer text-md h-8"
      onClick={editable ? handleClick : undefined}
      style={{
        backgroundColor: value.color,
      }}
    >
      {value.name}
    </Badge>
  );
}
