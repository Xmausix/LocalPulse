import { useState } from "react";
import { Check, X, Eye, Edit, Trash2, Radio, Clock, FileText, Shield, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import { incidents, formatTimeAgo, getSeverityColor, getSeverityLabel } from "@/data/mockData";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import pl from "@/i18n/pl";

// Mock submissions — replaced by API when backend is connected
const mockSubmissions = [
  { id: "s1", title: "Wypadek na ul. Klonowej", author: "Anonimowy", time: "5min temu", status: "pending" },
  { id: "s2", title: "Dym w okolicach strefy przemyslowej", author: "Jan K.", time: "18min temu", status: "pending" },
  { id: "s3", title: "Awaria pradu na 3 blokach", author: "Anonimowy", time: "1godz temu", status: "pending" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("articles");
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await api.approveSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({ title: pl.admin.approved, description: pl.admin.approvedDesc });
    } catch {
      toast({ title: pl.admin.error, description: pl.admin.errorApprove, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    try {
      await api.rejectSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({ title: pl.admin.rejected });
    } catch {
      toast({ title: pl.admin.error, description: pl.admin.errorReject, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteArticle(id);
      toast({ title: pl.admin.deleted, variant: "destructive" });
    } catch {
      toast({ title: pl.admin.error, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={pl.admin.title} description="Panel administracyjny PulseNews" />
      <Header />
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-alert" />
            <div>
              <h1 className="text-2xl font-black">{pl.admin.title}</h1>
              <p className="text-xs text-muted-foreground">{pl.admin.loggedAs} {user?.email}</p>
            </div>
          </div>
          <Button className="gap-1 bg-alert text-alert-foreground hover:bg-alert/90">
            <Edit className="h-4 w-4" /> {pl.admin.newArticle}
          </Button>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="articles" className="gap-1">
              <FileText className="h-4 w-4" /> {pl.admin.articlesTab}
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-1 relative">
              <Clock className="h-4 w-4" /> {pl.admin.submissionsTab}
              {submissions.length > 0 && (
                <span className="ml-1 bg-alert text-alert-foreground text-[10px] rounded-full px-1.5 py-0 font-bold">
                  {submissions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="flex items-center gap-4 rounded-xl border bg-card p-3">
                  <img src={inc.imageUrl} alt="" className="h-14 w-14 rounded-lg object-cover shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {inc.isLive && <Radio className="h-3 w-3 text-alert animate-pulse-live" />}
                      <Badge className={`${getSeverityColor(inc.severity)} text-[10px] px-1.5 py-0`}>
                        {getSeverityLabel(inc.severity)}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{pl.admin.published}</Badge>
                    </div>
                    <p className="text-sm font-semibold line-clamp-1">{inc.title}</p>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(inc.timestamp)} · {inc.views.toLocaleString()} {pl.trending.views}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={pl.admin.preview}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={pl.admin.edit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(inc.id)} aria-label={pl.admin.delete}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            {submissions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{pl.admin.noSubmissions}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div key={sub.id} className="rounded-xl border bg-card p-4 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{sub.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {sub.author} · {sub.time}
                        </span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          className="gap-1 bg-success text-success-foreground hover:bg-success/90"
                          onClick={() => handleApprove(sub.id)}
                          disabled={actionLoading === sub.id}
                        >
                          {actionLoading === sub.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          {pl.admin.approve}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive border-destructive"
                          onClick={() => handleReject(sub.id)}
                          disabled={actionLoading === sub.id}
                        >
                          <X className="h-4 w-4" /> {pl.admin.reject}
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder={pl.admin.feedbackPlaceholder}
                      value={feedback[sub.id] || ""}
                      onChange={(e) => setFeedback((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                      rows={2}
                      className="text-xs"
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
