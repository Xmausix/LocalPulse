import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { incidents, formatTimeAgo, getCategoryLabel } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function TrendingSection() {
  const trending = [...incidents].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-alert" />
        <h2 className="font-bold text-sm uppercase tracking-wide">{pl.trending.title}</h2>
      </div>
      <div className="space-y-3">
        {trending.map((item, i) => (
          <Link key={item.id} to={`/artykuly/${item.slug}`} className="flex gap-3 group">
            <span className="text-2xl font-black text-muted-foreground/40 leading-none w-7 shrink-0">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-alert transition-colors">
                {item.title}
              </p>
              <span className="text-xs text-muted-foreground">
                {getCategoryLabel(item.category)} · {formatTimeAgo(item.timestamp)} · {item.views.toLocaleString()} {pl.trending.views}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
