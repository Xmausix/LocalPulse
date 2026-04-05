import { Link } from "react-router-dom";
import { Radio, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { incidents, formatTimeAgo, getCategoryLabel } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function HeroSection() {
  const hero = incidents[0];
  const secondary = incidents.slice(1, 3);

  return (
    <section className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main hero */}
        <Link to={`/artykuly/${hero.slug}`} className="lg:col-span-2 group">
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] lg:aspect-[2/1]">
            <img
              src={hero.imageUrl}
              alt={hero.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2">
                {hero.isBreaking && (
                  <Badge className="bg-alert text-alert-foreground font-bold text-xs animate-pulse-live">
                    {pl.hero.breaking}
                  </Badge>
                )}
                {hero.isLive && (
                  <Badge variant="outline" className="border-alert text-alert-foreground text-xs flex items-center gap-1">
                    <Radio className="h-3 w-3" /> {pl.hero.live}
                  </Badge>
                )}
                <span className="text-xs text-primary-foreground/70">{getCategoryLabel(hero.category).toUpperCase()}</span>
              </div>
              <h1 className="text-xl md:text-3xl font-black leading-tight text-primary-foreground mb-2">
                {hero.title}
              </h1>
              <p className="text-sm text-primary-foreground/80 line-clamp-2 mb-3 max-w-2xl">
                {hero.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-primary-foreground/60">
                <span>{formatTimeAgo(hero.timestamp)}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {hero.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {hero.comments}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Secondary stories */}
        <div className="flex flex-col gap-4">
          {secondary.map((item) => (
            <Link key={item.id} to={`/artykuly/${item.slug}`} className="group flex-1">
              <div className="relative rounded-xl overflow-hidden h-full min-h-[180px]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isBreaking && (
                      <Badge className="bg-alert text-alert-foreground font-bold text-[10px]">{pl.hero.breaking}</Badge>
                    )}
                    {item.isLive && (
                      <Badge variant="outline" className="border-alert text-alert-foreground text-[10px] flex items-center gap-1">
                        <Radio className="h-2.5 w-2.5" /> {pl.hero.live}
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-sm md:text-base font-bold leading-tight text-primary-foreground line-clamp-2">
                    {item.title}
                  </h2>
                  <span className="text-xs text-primary-foreground/60 mt-1 block">{formatTimeAgo(item.timestamp)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
