import { Navigate, useLocation } from "react-router-dom";
import { useCustomerAuth } from "./CustomerAuthContext";

export default function CustomerProtected({ children }: { children: React.ReactNode }) {
  const { status } = useCustomerAuth();
  const location = useLocation();

  if (status === "checking") {
    return <div className="max-w-5xl mx-auto px-6 py-28 text-fluke-muted">Checking session...</div>;
  }
  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
