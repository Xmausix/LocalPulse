import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import pl from "@/i18n/pl";

const locations = [
    { name: "Lublin", slug: "lublin" },
    { name: "Zamość", slug: "zamosc" },
    { name: "Chełm", slug: "chelm" },
    { name: "Biała Podlaska", slug: "biala-podlaska" },
    { name: "Puławy", slug: "pulawy" },
    { name: "Świdnik", slug: "swidnik" },
    { name: "Kraśnik", slug: "krasnik" },
    { name: "Łuków", slug: "lukow" },
    { name: "Tomaszów Lubelski", slug: "tomaszow" },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container py-6 max-w-5xl">
                {/* Back */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {pl.article?.back || "Powrót"}
                </Link>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-black mb-6">
                    {pl.nav.category}
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {locations.map((loc) => (
                        <Link key={loc.slug} to={`/kategoria/${loc.slug}`}>
                            <div className="group rounded-xl border bg-card p-6 hover:bg-accent/50 transition-all hover:scale-[1.02] cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 rounded-lg bg-alert/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-alert" />
                                    </div>
                                    <h2 className="text-lg font-bold group-hover:text-alert transition-colors">
                                        {loc.name}
                                    </h2>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Sprawdź najnowsze zdarzenia w tej lokalizacji
                                </p>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-4 w-full justify-between"
                                >
                                    Przejdź
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}