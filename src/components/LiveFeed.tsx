import { Radio } from "lucide-react";
import { liveFeedItems } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function LiveFeed() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="h-4 w-4 text-alert animate-pulse-live" />
        <h2 className="font-bold text-sm uppercase tracking-wide">{pl.liveFeed.title}</h2>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide">
        {liveFeedItems.map((item) => (
          <div
            key={item.id}
            className={`relative pl-4 border-l-2 ${item.isNew ? "border-alert" : "border-border"} transition-colors`}
          >
            {item.isNew && (
              <span className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-alert animate-pulse-live" />
            )}
            <p className="text-sm leading-snug">{item.text}</p>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
