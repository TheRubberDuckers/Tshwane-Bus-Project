import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { user, login, canEdit } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to={canEdit ? "/helper" : "/"} replace />;
  return (
    <div className="login-page">
      <LoginForm onSubmit={async (u, p) => { await login(u, p); navigate("/helper"); }} />
    </div>
  );
}
