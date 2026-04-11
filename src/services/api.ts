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

    private async getAuthHeader(): Promise<string | null> {
        if (!this.getToken) return null;

        try {
            const token = await this.getToken();
            if (!token) return null;
            return `Bearer ${token}`;
        } catch {
            return null;
        }
    }

    private async request<T>(
        path: string,
        options: RequestInit & { auth?: boolean; retry?: boolean } = {}
    ): Promise<T> {
        const { auth = false, retry = true, ...fetchOpts } = options;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(fetchOpts.headers || {}),
            };

            if (auth) {
                const authHeader = await this.getAuthHeader();
                if (authHeader) {
                    headers["Authorization"] = authHeader;
                }
            }

            const res = await fetch(`${this.baseUrl}${path}`, {
                ...fetchOpts,
                headers,
                signal: controller.signal,
            });

            if (res.status === 401 && retry && auth) {
                return this.request<T>(path, {
                    ...options,
                    retry: false,
                });
            }

            if (!res.ok) {
                const errorBody = await res.text().catch(() => "Unknown error");
                throw new Error(`API ${res.status}: ${errorBody}`);
            }

            return res.json();
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.name === "AbortError") {
                    throw new Error("Request timeout");
                }

                throw err;
            }

            throw new Error("Unknown error");
        }
    }

    // PUBLIC

    async getIncidents(category?: string): Promise<Incident[]> {
        const params =
            category && category !== "all"
                ? `?category=${encodeURIComponent(category)}`
                : "";

        return this.request<Incident[]>(`/incidents${params}`);
    }

    async getIncident(id: string): Promise<Incident> {
        return this.request<Incident>(`/incidents/${id}`);
    }

    async getLiveFeed() {
        return this.request<
            Array<{ id: string; text: string; time: string; isNew: boolean }>
        >(`/live-feed`);
    }

    async getTrending(): Promise<Incident[]> {
        return this.request<Incident[]>(`/incidents/trending`);
    }

    async searchIncidents(query: string): Promise<Incident[]> {
        return this.request<Incident[]>(
            `/incidents/search?q=${encodeURIComponent(query)}`
        );
    }

    // USER

    async getUserSubmissions() {
        return this.request<
            Array<{
                id: string;
                title: string;
                category: string;
                status: "pending" | "approved" | "rejected";
                createdAt: string;
                feedback?: string;
            }>
        >(`/submissions/mine`, { auth: true });
    }

    async submitReport(data: {
        title: string;
        description: string;
        category: string;
        location: string;
        anonymous: boolean;
    }) {
        return this.request<{ id: string }>(`/submissions`, {
            method: "POST",
            body: JSON.stringify(data),
            auth: true,
        });
    }

    // ADMIN

    async getSubmissions() {
        return this.request<
            Array<{
                id: string;
                title: string;
                author: string;
                time: string;
                status: string;
            }>
        >(`/admin/submissions`, { auth: true });
    }

    async approveSubmission(id: string) {
        return this.request<void>(`/admin/submissions/${id}/approve`, {
            method: "POST",
            auth: true,
        });
    }

    async rejectSubmission(id: string) {
        return this.request<void>(`/admin/submissions/${id}/reject`, {
            method: "POST",
            auth: true,
        });
    }

    async deleteArticle(id: string) {
        return this.request<void>(`/admin/articles/${id}`, {
            method: "DELETE",
            auth: true,
        });
    }

    async updateArticleStatus(id: string, status: string) {
        return this.request<void>(`/admin/articles/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            auth: true,
        });
    }
}

export const api = new ApiService();