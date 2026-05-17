import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/endpoints";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(email, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.register(email, password);
      login(data.access_token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      mode="register"
      onSubmit={handleRegister}
      loading={loading}
      error={error}
    />
  );
}
