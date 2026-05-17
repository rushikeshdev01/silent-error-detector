import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/endpoints";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      login(data.access_token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  );
}
