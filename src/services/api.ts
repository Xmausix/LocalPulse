/**
 * External API Service Layer
 * 
 * All data operations go through the external backend.
 * The frontend NEVER directly accesses a database.
 */
import { API_BASE_URL } from "@/config/auth";
import type { Incident } from "@/data/mockData";

class ApiService {
  private baseUrl: string;
  private getToken: (() => Promise<string>) | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  setTokenGetter(fn: () => Promise<string>) {
    this.getToken = fn;
  }

  private async headers(auth = false): Promise<HeadersInit> {
    const h: HeadersInit = { "Content-Type": "application/json" };
    if (auth && this.getToken) {
      try {
        const token = await this.getToken();
        h["Authorization"] = `Bearer ${token}`;
      } catch {
        // Token unavailable — proceed without auth
      }
    }
    return h;
  }

  private async request<T>(
    path: string,
    options: RequestInit & { auth?: boolean } = {}
  ): Promise<T> {
    const { auth = false, ...fetchOpts } = options;
    const headers = await this.headers(auth);
    
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...fetchOpts,
      headers: { ...headers, ...(fetchOpts.headers || {}) },
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "Unknown error");
      throw new Error(`API Error ${res.status}: ${errorBody}`);
    }

    return res.json();
  }

  // Public endpoints (no auth required)
  async getIncidents(category?: string): Promise<Incident[]> {
    const params = category && category !== "all" ? `?category=${category}` : "";
    return this.request<Incident[]>(`/incidents${params}`);
  }

  async getIncident(id: string): Promise<Incident> {
    return this.request<Incident>(`/incidents/${id}`);
  }

  async getLiveFeed(): Promise<Array<{ id: string; text: string; time: string; isNew: boolean }>> {
    return this.request(`/live-feed`);
  }

  async getTrending(): Promise<Incident[]> {
    return this.request<Incident[]>(`/incidents/trending`);
  }

  async searchIncidents(query: string): Promise<Incident[]> {
    return this.request<Incident[]>(`/incidents/search?q=${encodeURIComponent(query)}`);
  }

  async getUserSubmissions(): Promise<Array<{
    id: string;
    title: string;
    category: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    feedback?: string;
  }>> {
    return this.request(`/submissions/mine`, { auth: true });
  }

  // Authenticated endpoints
  async submitReport(data: {
    title: string;
    description: string;
    category: string;
    location: string;
    anonymous: boolean;
  }): Promise<{ id: string }> {
    return this.request(`/submissions`, {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    });
  }

  // Admin endpoints
  async getSubmissions(): Promise<Array<{
    id: string;
    title: string;
    author: string;
    time: string;
    status: string;
  }>> {
    return this.request(`/admin/submissions`, { auth: true });
  }

  async approveSubmission(id: string): Promise<void> {
    return this.request(`/admin/submissions/${id}/approve`, {
      method: "POST",
      auth: true,
    });
  }

  async rejectSubmission(id: string): Promise<void> {
    return this.request(`/admin/submissions/${id}/reject`, {
      method: "POST",
      auth: true,
    });
  }

  async deleteArticle(id: string): Promise<void> {
    return this.request(`/admin/articles/${id}`, {
      method: "DELETE",
      auth: true,
    });
  }

  async updateArticleStatus(id: string, status: string): Promise<void> {
    return this.request(`/admin/articles/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      auth: true,
    });
  }
}

export const api = new ApiService();
