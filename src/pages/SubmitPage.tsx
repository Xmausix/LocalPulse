import { useState } from "react";
import { Send, Camera, MapPin, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import pl from "@/i18n/pl";

export default function SubmitPage() {
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !location || !description) {
      toast({ title: pl.submit.missingFields, description: pl.submit.missingFieldsDesc, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await api.submitReport({ title, description, category, location, anonymous });
      toast({ title: pl.submit.success, description: pl.submit.successDesc });
      setTitle("");
      setCategory("");
      setLocation("");
      setDescription("");
    } catch {
      toast({ title: pl.submit.failed, description: pl.submit.failedDesc, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={pl.submit.title} description={pl.submit.subtitle} />
      <Header />
      <div className="container py-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-black mb-1">{pl.submit.title}</h1>
          <p className="text-sm text-muted-foreground">{pl.submit.subtitle}</p>
          {user && (
            <p className="text-xs text-muted-foreground mt-1">
              {pl.submit.submittingAs} {anonymous ? pl.submit.anonymous : user.name || user.email}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">{pl.submit.incidentTitle} *</Label>
            <Input
              id="title"
              placeholder={pl.submit.incidentTitlePlaceholder}
              required
              className="mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>{pl.submit.category} *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={pl.submit.categoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c.id !== "all").map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">{pl.submit.locationLabel} *</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder={pl.submit.locationPlaceholder}
                  required
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">{pl.submit.description} *</Label>
            <Textarea
              id="description"
              placeholder={pl.submit.descriptionPlaceholder}
              rows={5}
              required
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>{pl.submit.media}</Label>
            <div className="mt-1 border-2 border-dashed rounded-xl p-8 text-center hover:bg-accent/30 transition-colors cursor-pointer">
              <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">{pl.submit.mediaTap}</p>
              <p className="text-xs text-muted-foreground mt-1">{pl.submit.mediaFormats}</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-accent/50 border p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{pl.submit.anonymousToggle}</p>
                <p className="text-xs text-muted-foreground">{pl.submit.anonymousDesc}</p>
              </div>
            </div>
            <Switch checked={anonymous} onCheckedChange={setAnonymous} />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 bg-alert text-alert-foreground hover:bg-alert/90"
            disabled={submitting}
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {submitting ? pl.submit.submitting : pl.submit.submitButton}
          </Button>
        </form>
      </div>
    </div>
  );
}
