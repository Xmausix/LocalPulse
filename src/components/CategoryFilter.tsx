import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.id ? "default" : "outline"}
          size="sm"
          className="shrink-0 text-xs"
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
