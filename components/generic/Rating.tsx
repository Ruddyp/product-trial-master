import { Star } from "lucide-react";
type RatingProps = {
  maxRating?: number;
  rating: number;
  size?: number;
};

export default function Rating({
  maxRating = 5,
  rating,
  size = 20,
}: RatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: maxRating }).map((item, i) => {
        const isFilled = i < rating;

        return (
          <Star
            key={i}
            size={size}
            fill={isFilled ? "orange" : "none"}
            color={"orange"}
          />
        );
      })}
    </div>
  );
}
