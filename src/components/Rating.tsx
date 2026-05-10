import { Star } from "lucide-react";

const RATING_VALUES = [1, 2, 3, 4, 5] as const;

export type RatingValue = (typeof RATING_VALUES)[number];

export function Rating({
  value,
  onChange,
}: {
  value: RatingValue;
  onChange?: (value: RatingValue) => void;
}) {
  return (
    <div className="flex gap-1">
      {RATING_VALUES.map((i) => (
        <Star
          key={i}
          className={
            (i <= value ? "fill-primary" : "fill-muted") +
            " stroke-primary h-5 w-5 " +
            (onChange ? "cursor-pointer" : "")
          }
          onClick={() => onChange?.(i)}
        />
      ))}
    </div>
  );
}
