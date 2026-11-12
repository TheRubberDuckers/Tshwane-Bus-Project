import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StatusMessage from "../StatusMessage/StatusMessage";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {
  const { user, loading, canEdit } = useAuth();
  if (loading) return <div className="protected"><StatusMessage>Checking your session…</StatusMessage></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!canEdit) {
    return (
      <div className="protected">
        <StatusMessage kind="error">This account can view routes but can't add them. Ask an admin for a Helper account.</StatusMessage>
      </div>
    );
  }
  return children;
}
