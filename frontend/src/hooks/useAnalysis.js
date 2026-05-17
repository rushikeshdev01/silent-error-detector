import { useState } from "react";
import { codeAPI } from "../api/endpoints";

export function useAnalysis() {
  const [result, setResult] = useState(null); // last analysis result
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // network / server error

  async function analyze(code) {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await codeAPI.submit(code);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        "Something went wrong. Is the backend running?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, analyze };
}
