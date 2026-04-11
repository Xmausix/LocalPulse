import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Radio, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import CategoryFilter from "@/components/CategoryFilter";
import {
    incidents,
    getSeverityColor,
    getSeverityLabel,
    getCategoryLabel,
    formatTimeAgo,
} from "@/data/mockData";
import pl from "@/i18n/pl";

// ✅ WAŻNE – CSS Leaflet
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";

// ✅ FIX ikon (działa z Vite / React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function createSeverityIcon(severity: string) {
    const color =
        severity === "critical"
            ? "#ef4444"
            : severity === "high"
                ? "#f97316"
                : "#eab308";

    return L.divIcon({
        className: "",
        html: `<div style="
            width: 20px;
            height: 20px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            ${severity === "critical" ? "animation: pulse 1.5s infinite;" : ""}
        "></div>
        <style>
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 ${color}88; }
            50% { box-shadow: 0 0 0 8px ${color}00; }
        }
        </style>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -14],
    });
}

interface Coordinates {
    lat: number;
    lng: number;
}

function FlyToIncident({ coordinates }: { coordinates: Coordinates | null }) {
    const map = useMap();

    useEffect(() => {
        if (coordinates) {
            map.flyTo([coordinates.lat, coordinates.lng], 14, {
                duration: 0.8,
            });
        }
    }, [coordinates, map]);

    return null;
}

export default function MapPage() {
    const [category, setCategory] = useState("all");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filtered =
        category === "all"
            ? incidents
            : incidents.filter((i) => i.category === category);

    const selected = filtered.find((i) => i.id === selectedId) ?? null;

    const center: [number, number] =
        filtered.length > 0
            ? [
                filtered.reduce((s, i) => s + i.coordinates.lat, 0) /
                filtered.length,
                filtered.reduce((s, i) => s + i.coordinates.lng, 0) /
                filtered.length,
            ]
            : [52.23, 21.01];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEOHead
                title={pl.map.title}
                description="Mapa zdarzeń na żywo w Twojej okolicy"
            />

            <Header />

            <div className="container py-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">{pl.map.title}</h1>

                    <Badge className="bg-alert text-alert-foreground flex items-center gap-1 text-xs">
                        <Radio className="h-3 w-3 animate-pulse-live" />
                        {filtered.length} {pl.map.active}
                    </Badge>
                </div>

                <CategoryFilter
                    selected={category}
                    onSelect={setCategory}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 flex-1">
                    {/* ✅ MAPA */}
                    <div className="lg:col-span-2 rounded-xl border overflow-hidden h-[500px] z-0">
                        {typeof window !== "undefined" && (
                            <MapContainer
                                center={center}
                                zoom={12}
                                style={{ height: "100%", width: "100%" }}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <FlyToIncident
                                    coordinates={
                                        selected ? selected.coordinates : null
                                    }
                                />

                                {filtered.map((inc) => (
                                    <Marker
                                        key={inc.id}
                                        position={[
                                            inc.coordinates.lat,
                                            inc.coordinates.lng,
                                        ]}
                                        icon={createSeverityIcon(
                                            inc.severity
                                        )}
                                        eventHandlers={{
                                            click: () => {
                                                setSelectedId(inc.id);
                                            },
                                        }}
                                    >
                                        <Popup>
                                            <div style={{ minWidth: "180px" }}>
                                                <span
                                                    className={`${getSeverityColor(
                                                        inc.severity
                                                    )} text-[10px] px-1.5 py-0.5 rounded font-semibold`}
                                                >
                                                    {getSeverityLabel(
                                                        inc.severity
                                                    ).toUpperCase()}
                                                </span>

                                                <p className="font-bold text-sm mt-1 mb-0.5">
                                                    {inc.title}
                                                </p>

                                                <p className="text-xs text-muted-foreground mb-1">
                                                    {inc.location} ·{" "}
                                                    {formatTimeAgo(
                                                        inc.timestamp
                                                    )}
                                                </p>

                                                <Link
                                                    to={`/artykuly/${inc.slug}`}
                                                    className="text-xs text-blue-600 underline"
                                                >
                                                    Pełny artykuł →
                                                </Link>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </div>

                    {/* PANEL */}
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {selected ? (
                            <div className="rounded-xl border bg-card p-4">
                                <Badge
                                    className={`${getSeverityColor(
                                        selected.severity
                                    )} text-xs mb-2`}
                                >
                                    {getSeverityLabel(
                                        selected.severity
                                    ).toUpperCase()}
                                </Badge>

                                <h3 className="font-bold text-sm mb-1">
                                    {selected.title}
                                </h3>

                                <p className="text-xs text-muted-foreground mb-2">
                                    {selected.summary}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <span>
                                        {getCategoryLabel(
                                            selected.category
                                        )}
                                    </span>
                                    <span>
                                        ·{" "}
                                        {formatTimeAgo(
                                            selected.timestamp
                                        )}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/artykuly/${selected.slug}`}
                                    >
                                        <Button
                                            size="sm"
                                            className="text-xs gap-1"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            {pl.map.fullArticle}
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs"
                                        onClick={() =>
                                            setSelectedId(null)
                                        }
                                    >
                                        {pl.map.close}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            filtered.map((inc) => (
                                <button
                                    key={inc.id}
                                    className="w-full text-left rounded-xl border bg-card p-3 hover:bg-accent/50"
                                    onClick={() =>
                                        setSelectedId(inc.id)
                                    }
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge
                                            className={`${getSeverityColor(
                                                inc.severity
                                            )} text-[10px] px-1.5 py-0`}
                                        >
                                            {getSeverityLabel(
                                                inc.severity
                                            ).toUpperCase()}
                                        </Badge>

                                        {inc.isLive && (
                                            <Radio className="h-3 w-3 text-alert animate-pulse-live" />
                                        )}
                                    </div>

                                    <p className="text-sm font-semibold line-clamp-1">
                                        {inc.title}
                                    </p>

                                    <span className="text-xs text-muted-foreground">
                                        {inc.location} ·{" "}
                                        {formatTimeAgo(
                                            inc.timestamp
                                        )}
                                    </span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}