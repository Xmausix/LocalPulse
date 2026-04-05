import { type ReactNode } from "react";
import { useApiAuth } from "@/hooks/useApi";

/**
 * AppShell — wires up global side-effects (API auth binding, etc.)
 */
export default function AppShell({ children }: { children: ReactNode }) {
  useApiAuth();
  return <>{children}</>;
}
