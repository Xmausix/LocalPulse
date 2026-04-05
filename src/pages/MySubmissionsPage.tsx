import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import pl from "@/i18n/pl";

interface Submission {
  id: string;
  title: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  feedback?: string;
}

const statusConfig = {
  pending: { label: pl.mySubmissions.status.pending, icon: Clock, className: "bg-yellow-500 text-foreground" },
  approved: { label: pl.mySubmissions.status.approved, icon: CheckCircle, className: "bg-success text-success-foreground" },
  rejected: { label: pl.mySubmissions.status.rejected, icon: XCircle, className: "bg-destructive text-destructive-foreground" },
};

export default function MySubmissionsPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await api.getUserSubmissions();
        setSubmissions(data);
      } catch {
        // API unavailable — show empty state
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={pl.mySubmissions.title} description={pl.mySubmissions.subtitle} />
      <Header />
      <div className="container py-6 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-alert" />
            <div>
              <h1 className="text-2xl font-black">{pl.mySubmissions.title}</h1>
              <p className="text-xs text-muted-foreground">{pl.mySubmissions.subtitle}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">{pl.mySubmissions.noSubmissions}</p>
            <p className="text-xs mt-1">{pl.mySubmissions.noSubmissionsDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const config = statusConfig[sub.status];
              const StatusIcon = config.icon;
              return (
                <div key={sub.id} className="rounded-xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{sub.title}</p>
                      <span className="text-xs text-muted-foreground">{sub.createdAt}</span>
                    </div>
                    <Badge className={`${config.className} text-xs flex items-center gap-1 shrink-0`}>
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>
                  {sub.feedback && (
                    <p className="text-xs text-muted-foreground mt-2 border-t pt-2">{sub.feedback}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
