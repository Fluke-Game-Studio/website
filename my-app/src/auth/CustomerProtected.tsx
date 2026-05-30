import { Navigate, useLocation } from "react-router-dom";
import { useCustomerAuth } from "./CustomerAuthContext";

export default function CustomerProtected({ children }: { children: React.ReactNode }) {
  const { session, status } = useCustomerAuth();
  const location = useLocation();

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fluke-bg">
        <div className="w-12 h-12 border-4 border-fluke-yellow/20 border-t-fluke-yellow rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
