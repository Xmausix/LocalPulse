import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye, MessageSquare, MapPin, Clock, Radio, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import ShareButtons from "@/components/ShareButtons";
import { incidents, formatTimeAgo, getSeverityColor, getSeverityLabel, getCategoryLabel } from "@/data/mockData";
import pl from "@/i18n/pl";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = incidents.find((i) => i.slug === slug || i.id === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{pl.article.notFound}</h1>
          <Link to="/"><Button>{pl.article.backToHome}</Button></Link>
        </div>
      </div>
    );
  }

  const articleUrl = `/artykuly/${article.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.title}
        description={article.summary}
        image={article.imageUrl}
        url={articleUrl}
      />
      <Header />
      <div className="container py-6 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> {pl.article.back}
        </Link>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {article.isBreaking && (
            <Badge className="bg-alert text-alert-foreground font-bold">{pl.hero.breaking}</Badge>
          )}
          {article.isLive && (
            <Badge variant="outline" className="border-alert text-alert flex items-center gap-1">
              <Radio className="h-3 w-3 animate-pulse-live" /> {pl.hero.live}
            </Badge>
          )}
          <Badge variant="outline" className={getSeverityColor(article.severity)}>
            {getSeverityLabel(article.severity).toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {getCategoryLabel(article.category)}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {formatTimeAgo(article.timestamp)}</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {article.location}</span>
          <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {article.views.toLocaleString()}</span>
          <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {article.comments}</span>
        </div>

        {/* Featured image */}
        <div className="rounded-xl overflow-hidden mb-6 aspect-video">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" loading="eager" />
        </div>

        {/* Quick facts */}
        <div className="rounded-xl bg-accent/50 border p-4 mb-6">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-alert" /> {pl.article.quickFacts}
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
            <li>{article.summary}</li>
            <li>{pl.article.location}: {article.location}</li>
            <li>{pl.article.severity}: {getSeverityLabel(article.severity)}</li>
          </ul>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none mb-8">
          <p className="text-base leading-relaxed">{article.content}</p>
        </div>

        {/* Timeline */}
        {article.timeline && (
          <>
            <Separator className="my-6" />
            <h3 className="font-bold text-lg mb-4">{pl.article.timeline}</h3>
            <div className="space-y-4 mb-8">
              {article.timeline.map((event, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-alert shrink-0 mt-1" />
                    {i < article.timeline!.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs font-mono text-muted-foreground">{event.time}</span>
                    <p className="text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <ShareButtons url={articleUrl} title={article.title} description={article.summary} />
          <Link to="/zglos">
            <Button size="sm" className="gap-1 bg-alert text-alert-foreground hover:bg-alert/90">
              <AlertTriangle className="h-4 w-4" /> {pl.article.reportSimilar}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
