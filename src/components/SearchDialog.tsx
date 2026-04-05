import { useState, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";
import { getSeverityColor, getSeverityLabel, formatTimeAgo } from "@/data/mockData";
import type { Incident } from "@/data/mockData";
import pl from "@/i18n/pl";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const data = await api.searchIncidents(q.trim());
      setResults(data);
    } catch {
      // Fallback: local search from imported data
      const { incidents } = await import("@/data/mockData");
      const lower = q.toLowerCase();
      setResults(
        incidents.filter(
          (i) =>
            i.title.toLowerCase().includes(lower) ||
            i.content.toLowerCase().includes(lower) ||
            i.location.toLowerCase().includes(lower)
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">{pl.search.title}</DialogTitle>
        </DialogHeader>
        <div className="relative px-4 pb-2">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={pl.search.placeholder}
            className="pl-9 pr-9"
            autoFocus
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-7 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto px-4 pb-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">{pl.search.searching}</span>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm font-medium text-muted-foreground">{pl.search.noResults}</p>
              <p className="text-xs text-muted-foreground mt-1">{pl.search.noResultsDesc}</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  to={`/artykuly/${item.slug || item.id}`}
                  onClick={handleClose}
                  className="flex gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-14 w-14 rounded-md object-cover shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge className={`${getSeverityColor(item.severity)} text-[10px] px-1.5 py-0`}>
                        {getSeverityLabel(item.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {item.location} · {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
