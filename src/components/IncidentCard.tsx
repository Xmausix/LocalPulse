import { Link } from "react-router-dom";
import { Eye, MessageSquare, MapPin, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Incident } from "@/data/mockData";
import { formatTimeAgo, getSeverityColor, getSeverityLabel, getCategoryLabel } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <Link to={`/artykuly/${incident.slug || incident.id}`} className="group">
      <article className="flex gap-4 rounded-xl border bg-card p-3 transition-colors hover:bg-accent/50">
        <div className="relative h-24 w-24 md:h-28 md:w-28 shrink-0 rounded-lg overflow-hidden">
          <img
            src={incident.imageUrl}
            alt={incident.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {incident.isLive && (
            <div className="absolute top-1 left-1">
              <Badge className="bg-alert text-alert-foreground text-[10px] px-1.5 py-0 flex items-center gap-0.5">
                <Radio className="h-2.5 w-2.5 animate-pulse-live" /> {pl.hero.live}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getSeverityColor(incident.severity)}`}>
              {getSeverityLabel(incident.severity).toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {getCategoryLabel(incident.category)}
            </span>
          </div>
          <h3 className="font-bold text-sm leading-snug line-clamp-2 mb-1 group-hover:text-alert transition-colors">
            {incident.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {incident.location}</span>
            <span>{formatTimeAgo(incident.timestamp)}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {incident.views.toLocaleString()}</span>
            <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {incident.comments}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
