import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Radio, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import CategoryFilter from "@/components/CategoryFilter";
import { incidents, getSeverityColor, getSeverityLabel, getCategoryLabel, formatTimeAgo } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function MapPage() {
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = category === "all"
    ? incidents
    : incidents.filter((i) => i.category === category);

  const selected = filtered.find((i) => i.id === selectedId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title={pl.map.title} description="Mapa zdarzen na zywo w Twojej okolicy" />
      <Header />
      <div className="container py-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">{pl.map.title}</h1>
          <Badge className="bg-alert text-alert-foreground flex items-center gap-1 text-xs">
            <Radio className="h-3 w-3 animate-pulse-live" /> {filtered.length} {pl.map.active}
          </Badge>
        </div>
        <CategoryFilter selected={category} onSelect={setCategory} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 flex-1">
          {/* Map placeholder */}
          <div className="lg:col-span-2 rounded-xl border bg-accent/30 relative overflow-hidden min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=60')] bg-cover bg-center opacity-20" />
            <div className="relative z-10 text-center">
              {filtered.map((inc) => (
                <button
                  key={inc.id}
                  className={`absolute transition-transform hover:scale-125 ${selectedId === inc.id ? "scale-125" : ""}`}
                  style={{
                    left: `${((inc.coordinates.lng + 122.1) / 0.25) * 100}%`,
                    top: `${((37.4 - inc.coordinates.lat) / 0.1) * 100}%`,
                  }}
                  onClick={() => setSelectedId(inc.id)}
                >
                  <div className={`h-5 w-5 rounded-full border-2 border-card ${inc.severity === "critical" ? "bg-alert animate-pulse-live" : inc.severity === "high" ? "bg-urgent" : "bg-yellow-500"} shadow-lg`} />
                </button>
              ))}
              <p className="text-muted-foreground text-sm">
                <MapPin className="h-5 w-5 inline mr-1" />
                {pl.map.clickMarkers}
              </p>
            </div>
          </div>

          {/* Incident list */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide">
            {selected ? (
              <div className="rounded-xl border bg-card p-4 animate-slide-in">
                <Badge className={`${getSeverityColor(selected.severity)} text-xs mb-2`}>
                  {getSeverityLabel(selected.severity).toUpperCase()}
                </Badge>
                <h3 className="font-bold text-sm mb-1">{selected.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{selected.summary}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>{getCategoryLabel(selected.category)}</span>
                  <span>· {formatTimeAgo(selected.timestamp)}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/artykuly/${selected.slug}`}>
                    <Button size="sm" className="text-xs gap-1">
                      <ExternalLink className="h-3 w-3" /> {pl.map.fullArticle}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setSelectedId(null)}>
                    {pl.map.close}
                  </Button>
                </div>
              </div>
            ) : (
              filtered.map((inc) => (
                <button
                  key={inc.id}
                  className="w-full text-left rounded-xl border bg-card p-3 hover:bg-accent/50 transition-colors"
                  onClick={() => setSelectedId(inc.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${getSeverityColor(inc.severity)} text-[10px] px-1.5 py-0`}>
                      {getSeverityLabel(inc.severity).toUpperCase()}
                    </Badge>
                    {inc.isLive && <Radio className="h-3 w-3 text-alert animate-pulse-live" />}
                  </div>
                  <p className="text-sm font-semibold line-clamp-1">{inc.title}</p>
                  <span className="text-xs text-muted-foreground">{inc.location} · {formatTimeAgo(inc.timestamp)}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
