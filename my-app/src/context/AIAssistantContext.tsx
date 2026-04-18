import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type {
  PublicAnalyticsDashboard,
  PublicAwardItem,
  PublicTeamMember,
} from "@/services/publicStudioService";

export type AIAssistantMode = "global" | "employee";

export interface EmployeeAIContext {
  member: PublicTeamMember;
  awards: PublicAwardItem[];
  mediaCount: number;
  analytics: PublicAnalyticsDashboard | null;
}

interface AIAssistantState {
  isOpen: boolean;
  mode: AIAssistantMode;
  employeeCtx: EmployeeAIContext | null;
  pendingQuestion: string | null;
}

interface AIAssistantContextValue extends AIAssistantState {
  openGlobal: () => void;
  openForEmployee: (ctx: EmployeeAIContext, question?: string) => void;
  closeChat: () => void;
  consumePendingQuestion: () => void;
  toggleOpen: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextValue | null>(null);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AIAssistantState>({
    isOpen: false,
    mode: "global",
    employeeCtx: null,
    pendingQuestion: null,
  });

  const openGlobal = useCallback(() => {
    setState((s) => ({ ...s, isOpen: true, mode: "global", employeeCtx: null, pendingQuestion: null }));
  }, []);

  const openForEmployee = useCallback((ctx: EmployeeAIContext, question?: string) => {
    setState((s) => ({
      ...s,
      isOpen: true,
      mode: "employee",
      employeeCtx: ctx,
      pendingQuestion: question ?? null,
    }));
  }, []);

  const closeChat = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false, pendingQuestion: null }));
  }, []);

  const consumePendingQuestion = useCallback(() => {
    setState((s) => ({ ...s, pendingQuestion: null }));
  }, []);

  const toggleOpen = useCallback(() => {
    setState((s) => ({ ...s, isOpen: !s.isOpen, pendingQuestion: s.isOpen ? null : s.pendingQuestion }));
  }, []);

  return (
    <AIAssistantContext.Provider
      value={{ ...state, openGlobal, openForEmployee, closeChat, consumePendingQuestion, toggleOpen }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const ctx = useContext(AIAssistantContext);
  if (!ctx) throw new Error("useAIAssistant must be used inside AIAssistantProvider");
  return ctx;
}
