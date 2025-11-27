import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerifierRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "verifier") return <Navigate to="/login" />;

  return children;
}
