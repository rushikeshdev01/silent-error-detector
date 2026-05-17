import { useState } from "react";

export default function AuthForm({ mode, onSubmit, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-danger opacity-80" />
            <span className="w-3 h-3 rounded-full bg-warn opacity-80" />
            <span className="w-3 h-3 rounded-full bg-accent opacity-80" />
          </div>
          <h1 className="font-mono text-xl font-bold text-text tracking-widest uppercase">
            silent<span className="text-accent">_error</span>
          </h1>
          <p className="font-mono text-xs text-dim mt-1">
            {isLogin ? "// sign in to your session" : "// create a new session"}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-dim mb-1">
                email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg border border-border rounded px-3 py-2 font-mono text-sm text-text focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-dim mb-1">
                password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-border rounded px-3 py-2 font-mono text-sm text-text focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-mono text-xs text-danger border border-danger/30 bg-danger/5 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2 rounded border border-accent bg-accent/10 text-accent font-mono text-sm font-bold uppercase tracking-wider hover:bg-accent hover:text-bg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "authenticating..." : isLogin ? "sign in" : "register"}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs text-dim mt-4">
          {isLogin ? "no account? " : "have an account? "}
          <a
            href={isLogin ? "/register" : "/login"}
            className="text-accent hover:underline"
          >
            {isLogin ? "register" : "sign in"}
          </a>
        </p>
      </div>
    </div>
  );
}
