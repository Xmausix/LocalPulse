import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveFeed from "@/components/LiveFeed";
import IncidentCard from "@/components/IncidentCard";
import TrendingSection from "@/components/TrendingSection";
import CategoryFilter from "@/components/CategoryFilter";
import SEOHead from "@/components/SEOHead";
import { incidents } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function Index() {
  const [category, setCategory] = useState("all");

  const filtered = category === "all"
    ? incidents
    : incidents.filter((i) => i.category === category);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Strona glowna"
        description="Badz na biezaco z lokalnymi zdarzeniami. Wypadki, pozary, policja i sytuacje kryzysowe w Twojej okolicy."
        type="website"
      />
      <Header />
      <HeroSection />

      <div className="container pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{pl.index.latestIncidents}</h2>
            </div>
            <CategoryFilter selected={category} onSelect={setCategory} />
            <div className="space-y-3">
              {filtered.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <LiveFeed />
            <TrendingSection />
          </aside>
        </div>
      </div>
    </div>
  );
}
